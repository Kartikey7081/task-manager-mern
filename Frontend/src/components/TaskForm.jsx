import  { useState, useEffect, useRef } from 'react';
import { PRIORITIES, CATEGORIES } from '../constants';

const EMPTY = { title: '', description: '', priority: 'medium', category: 'Work', dueDate: '', tags: '' };

export default function TaskForm({ onClose, onSubmit, initial }) {
  const [form, setForm] = useState(initial
    ? { ...initial, tags: (initial.tags || []).join(', ') }
    : EMPTY
  );
  const titleRef = useRef();

  useEffect(() => { titleRef.current?.focus(); }, []);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    const tags = form.tags.split(',').map(t => t.trim()).filter(Boolean);
    console.log(form);
    onSubmit({ ...form, tags });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-full max-w-xl">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold">
            {initial ? '✏️ Edit Task' : '✨ New Task'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">×</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Title */}
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Task Title *</label>
            <input
              ref={titleRef}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              value={form.title}
              onChange={e => set('title', e.target.value)}
              placeholder="What needs to be done?"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Description</label>
            <textarea
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm resize-y"
              value={form.description}
              onChange={e => set('description', e.target.value)}
              rows={3}
            />
          </div>

          {/* Priority + Category */}
          <div className="grid grid-cols-2 gap-4">

            {/* Priority */}
            <div>
              <label className="text-xs text-gray-400 mb-2 block">Priority</label>
              <div className="flex flex-col gap-2">
                {Object.entries(PRIORITIES).map(([k, v]) => (
                  <label
                    key={k}
                    className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition
                      ${form.priority === k
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-gray-700'
                      }`}
                  >
                    <input
                      type="radio"
                      checked={form.priority === k}
                      onChange={() => set('priority', k)}
                    />
                    <span className="text-sm">{v.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Category */}
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Category</label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(c => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => set('category', c)}
                      className={`px-3 py-1 text-xs rounded-full border transition
                        ${form.category === c
                          ? 'border-blue-500 text-blue-400 bg-blue-500/20'
                          : 'border-gray-700 text-gray-400'
                        }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-400 mb-1 block">Due Date</label>
                <input
                  type="date"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm"
                  value={form.dueDate}
                  onChange={e => set('dueDate', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Tags */}
          <input
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm"
            value={form.tags}
            onChange={e => set('tags', e.target.value)}
            placeholder="design, frontend, urgent"
          />

          {/* Buttons */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-700 hover:bg-gray-600 py-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-2 bg-blue-600 hover:bg-blue-500 py-2 rounded-lg"
            >
              {initial ? 'Save Changes' : '+ Add Task'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}