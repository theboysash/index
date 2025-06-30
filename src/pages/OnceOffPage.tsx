// src/pages/OnceOffPage.tsx
import React, { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import type { OnceOffTask } from '../domain/Task';
import '../styles/forms.css';   // make sure this is imported somewhere globally too

export default function OnceOffPage() {
  // ⇢ bring in live tasks + create/update/remove
  const { tasks, create, update, remove } = useTasks<OnceOffTask>('once-off');

  // ⇢ form state
  const [title, setTitle]       = useState('');
  const [importance, setImp]    = useState<1|2|3|4|5>(3);
  const [due, setDue]           = useState('');
  const [duration, setDur]      = useState(1);
  const [effort, setEffort]     = useState<1|2|3>(2);
  const [description, setDesc]  = useState('');

  // ⇢ on submit, call create()
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !due) return;
    await create({
      userId: 'test-user',
      category: 'once-off',
      title,
      importance,
      dueDate: new Date(due),
      durationHours: duration,
      effortLevel: effort,
      description,
    });
    // reset
    setTitle(''); setDue(''); setImp(3);
    setDur(1); setEffort(2); setDesc('');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Once-off Tasks</h1>

      <form className="colorful-form" onSubmit={handleAdd}>
        <div className="form-group">
          <label className="form-label">Title</label>
          <input
            className="form-input"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Due Date</label>
          <input
            type="date"
            className="form-input"
            value={due}
            onChange={e => setDue(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Importance</label>
          <select
            className="form-input"
            value={importance}
            onChange={e => setImp(+e.target.value as any)}
          >
            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}★</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Duration (hrs)</label>
          <input
            type="number" min={0.25} step={0.25}
            className="form-input"
            value={duration}
            onChange={e => setDur(+e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Effort</label>
          <select
            className="form-input"
            value={effort}
            onChange={e => setEffort(+e.target.value as any)}
          >
            <option value={1}>Light</option>
            <option value={2}>Medium</option>
            <option value={3}>Heavy</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            className="form-input"
            rows={3}
            value={description}
            onChange={e => setDesc(e.target.value)}
          />
        </div>
        <button type="submit" className="form-button">Add Task</button>
      </form>

      {/* --- live list below --- */}
      <ul className="mt-6 space-y-2">
        {tasks.map(t => (
          <li
            key={t.id}
            className="border p-2 rounded flex justify-between items-start"
          >
            <div>
              <h3 className="font-semibold">{t.title}</h3>
              {t.description && <p className="text-sm">{t.description}</p>}
              <p className="text-xs text-gray-500">
                due {t.dueDate.toLocaleDateString()}, imp {t.importance},
                {t.durationHours}h, effort {t.effortLevel}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <button
                className="text-blue-600 text-sm"
                onClick={() => update(t.id, { title: t.title + ' ✏️' })}
              >
                Edit
              </button>
              <button
                className="text-red-600 text-sm"
                onClick={() => remove(t.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
