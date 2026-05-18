import axios from "axios";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import StatsPanel from "./components/StatsPanel";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const fetchNotes = async () => {


    try {
      const res = await axios.get("https://task-manager-mern-3hv5.onrender.com/api/notes");

      setNotes(res.data);



    } catch (err) {
      console.log(err);
    }
  };

  const handleAddTask = async (data) => {
    try {
      if (!data.title.trim()) return;

      const payload = {
        title: data.title,
description: data.description,
        category: data.category,
        tags: Array.isArray(data.tags)
          ? data.tags
          : data.tags
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean),
        dueDate: data.dueDate,
        done: false,
        starred: false,
      };

      const res = await axios.post("https://task-manager-mern-3hv5.onrender.com/api/notes", payload);

      setNotes((prev) => [...prev, res.data]);

      setShowForm(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
   fetchNotes();
  }, []);

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`https://task-manager-mern-3hv5.onrender.com/api/notes/${id}`);

      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleToggleDone = async (note) => {
    try {
      const updatedTask = {
        ...note,
        done: !note.done,
      };

      await axios.patch(
        `https://task-manager-mern-3hv5.onrender.com/api/notes/${note._id}`,
        updatedTask,
      );

setNotes((prev) =>
  prev.map((n) =>
    n._id === note._id ? updatedTask : n
  )
);    } catch (err) {
      console.log(err);
    }
  };

  const handleEditTask = async (data) => {
    try {
      const updatedTask = {
        ...editTask,
        title: data.title,
description: data.description,
        category: data.category,
        tags: data.tags,
        dueDate: data.dueDate,
      };

      const res = await axios.patch(
        `https://task-manager-mern-3hv5.onrender.com/api/notes/${editTask._id}`,
        updatedTask,
      );

      setNotes(
        notes.map((note) => (note._id === editTask._id ? res.data : note)),
      );

      setShowForm(false);
      setEditTask(null);
    } catch (err) {
      console.log(err);
    }
  };

 const doneCount = notes.filter(note => note.done).length;

const remainingCount = notes.length - doneCount;

  return (
    <div className="bg-black text-white min-h-screen p-4">
      <Header
        onAddClick={() => setShowForm(true)}
        showStats={showStats}
        onStatsClick={() => setShowStats(!showStats)}
        doneCount={doneCount}
  remainingCount={remainingCount}
      />
      {showForm && (
        <TaskForm
          onClose={() => {
            setShowForm(false);
            setEditTask(null);
          }}
          onSubmit={editTask ? handleEditTask : handleAddTask}
          initial={editTask}
        />
      )}
      {showStats && (
        <StatsPanel onClose={() => setShowStats(false)} todos={notes} />
      )}

      {/* Notes List */}
      <div className="mt-6 space-y-4">
        {notes.length === 0 && (
          <div className="text-center text-gray-500 mt-10">No tasks found</div>
        )}
        {notes.map((note) => (
          <div
            key={note._id}
            className="bg-gray-800 p-4 flex justify-between items-start rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <div>
              <h1
                className={`text-lg font-bold ${note.done ? "line-through text-gray-500" : ""}`}
              >
                {note.title}
              </h1>{" "}
              <p
                className={`text-lg font-bold ${note.done ? "line-through text-gray-500" : ""}`}
              >
                {note.description}
              </p>
              <p className="text-sm text-blue-400">{note.category}</p>
              <p className="text-sm text-yellow-400">{note.tags?.join(", ")}</p>
              <p className="text-sm text-green-400">{note.dueDate}</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isDone"
                checked={note.done}
                onChange={() => handleToggleDone(note)}
                className="w-5 h-5 accent-green-500 cursor-pointer"
              />
              <button
                onClick={() => {
                  setEditTask(note);
                  setShowForm(true);
                }}
                className="bg-yellow-500 hover:bg-yellow-600 px-3 m-2 py-1 rounded "
              >
                <FiEdit />
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 px-3 py-1  m-2 rounded "
                onClick={() => handleDeleteTask(note._id)}
              >
                <RiDeleteBin6Line />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
