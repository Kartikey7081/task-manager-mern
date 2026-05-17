import { useState, useEffect } from "react";

const API_URL = "http://localhost:3000/api/notes";

export function useTodos() {
  const [todos, setTodos] = useState([]);

  // Load from backend
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(setTodos)
      .catch(err => console.log(err));
  }, []);

  // Add
  const addTodo = async (data) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const newTodo = await res.json();
    setTodos(prev => [newTodo, ...prev]);
  };

  // Delete
  const deleteTodo = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    setTodos(prev => prev.filter(t => t._id !== id));
  };

  // Toggle Done
  const toggleDone = async (id, current) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: !current }),
    });

    const updated = await res.json();

    setTodos(prev =>
      prev.map(t => (t._id === id ? updated : t))
    );
  };

  return { todos, addTodo, deleteTodo, toggleDone };
}