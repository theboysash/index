import React, { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import type { OnceOffTask } from '../domain/Task';
import '../styles/forms.css';
import '../styles/Table.css';

export default function OnceOffPage() {
  const { tasks, create, update, remove } = useTasks<OnceOffTask>('once-off');

  const [title, setTitle] = useState('');
  const [importance, setImp] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [due, setDue] = useState('');
  const [duration, setDur] = useState(1);
  const [effort, setEffort] = useState<1 | 2 | 3>(2);
  const [description, setDesc] = useState('');

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
    setTitle('');
    setDue('');
    setImp(3);
    setDur(1);
    setEffort(2);
    setDesc('');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Once-off Tasks</h1>

      

      {/* --- live list below --- */}
      <table className="task-table mt-6">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Importance</th>
            <th>Duration (h)</th>
            <th>Effort</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t) => (
            <tr key={t.id}>
              <td>{t.title}</td>
              <td>{t.description || '—'}</td>
              <td>{t.dueDate.toLocaleDateString()}</td>
              <td>{t.importance}★</td>
              <td>{t.durationHours}</td>
              <td>
                {t.effortLevel === 1
                  ? 'Light'
                  : t.effortLevel === 2
                  ? 'Medium'
                  : 'Heavy'}
              </td>
              <td className="actions-cell">
                <button onClick={() => update(t.id, { title: t.title + ' ✏️' })}>
                  Edit
                </button>
                <button onClick={() => remove(t.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form className="colorful-form" onSubmit={handleAdd}>
        <div className="form-group">
          <label className="form-label">Title</label>
          <input
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Due Date</label>
          <input
            type="date"
            className="form-input"
            value={due}
            onChange={(e) => setDue(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Importance</label>
          <select
            className="form-input"
            value={importance}
            onChange={(e) => setImp(+e.target.value as any)}
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}★
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Duration (hrs)</label>
          <input
            type="number"
            min={0.25}
            step={0.25}
            className="form-input"
            value={duration}
            onChange={(e) => setDur(+e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Effort</label>
          <select
            className="form-input"
            value={effort}
            onChange={(e) => setEffort(+e.target.value as any)}
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
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <button type="submit" className="form-button">
          Add Task
        </button>
      </form>
    </div>
  );
}
