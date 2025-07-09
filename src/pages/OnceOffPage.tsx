// src/pages/OnceOffPage.tsx

import React, { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import type { OnceOffTask } from '../domain/Task';
import '../styles/forms.css';
import '../styles/Table.css';
import { EditableCell } from '../components/EditableTable';

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
              <EditableCell value={t.title} onChange={(v) => update(t.id, { title: v })} />
              <EditableCell value={t.description || ''} onChange={(v) => update(t.id, { description: v })} />
              <EditableCell
                value={t.dueDate.toISOString().slice(0, 10)}
                type="text"
                onChange={(v) => update(t.id, { dueDate: new Date(v) })}
              />
              <EditableCell
                value={t.importance}
                type="select"
                options={['1', '2', '3', '4', '5']}
                onChange={(v) => update(t.id, { importance: Number(v) as 1 | 2 | 3 | 4 | 5 })}
              />
              <EditableCell
                value={t.durationHours ?? 0}
                type="number"
                onChange={(v) => update(t.id, { durationHours: Number(v) })}
              />
              <EditableCell
                value={t.effortLevel ?? 1}
                type="select"
                options={['1', '2', '3']}
                onChange={(v) => update(t.id, { effortLevel: Number(v) as 1 | 2 | 3 })}
              />
              <td className="actions-cell">
                <button onClick={() => remove(t.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form className="colorful-form mt-10" onSubmit={handleAdd}>
        <div className="form-group">
          <label className="form-label">Title</label>
          <input className="form-input" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <input className="form-input" value={description} onChange={(e) => setDesc(e.target.value)} />
        </div>

        <div className="form-group">
          <label className="form-label">Due Date</label>
          <input className="form-input" type="date" value={due} onChange={(e) => setDue(e.target.value)} required />
        </div>

        <div className="form-group">
          <label className="form-label">Importance (1-5)</label>
          <select className="form-input" value={importance} onChange={(e) => setImp(Number(e.target.value) as any)}>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Duration (hours)</label>
          <input
            className="form-input"
            type="number"
            min={0}
            step={0.1}
            value={duration}
            onChange={(e) => setDur(Number(e.target.value))}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Effort</label>
          <select
            className="form-input"
            value={effort}
            onChange={(e) => setEffort(Number(e.target.value) as 1 | 2 | 3)}
          >
            <option value={1}>Light</option>
            <option value={2}>Medium</option>
            <option value={3}>Heavy</option>
          </select>
        </div>

        <button className="form-button mt-4" type="submit">Add Task</button>
      </form>
    </div>
  );
}
