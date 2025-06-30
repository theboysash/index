// src/pages/ChorePage.tsx
import React, { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import type { Chore } from '../domain/Task';
import '../styles/forms.css';

export default function ChorePage() {
  const { tasks: chores, create, update, remove } = useTasks<Chore>('chore');

  const [title, setTitle] = useState('');
  const [importance, setImportance] = useState<1|2|3|4|5>(3);
  const [interval, setInterval] = useState<'daily'|'weekly'|'monthly'>('daily');
  const [frequency, setFrequency] = useState<number>(1);
  const [duration, setDuration] = useState<number>(1);
  const [effort, setEffort] = useState<1|2|3>(2);
  const [description, setDescription] = useState('');

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    await create({
      userId: 'test-user',
      category: 'chore',
      title,
      importance,
      interval,
      frequency,
      durationHours: duration,
      effortLevel: effort,
      description,
    });
    // reset form
    setTitle('');
    setImportance(3);
    setInterval('daily');
    setFrequency(1);
    setDuration(1);
    setEffort(2);
    setDescription('');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Chores</h1>

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
          <label className="form-label">Importance</label>
          <select
            className="form-input"
            value={importance}
            onChange={e => setImportance(+e.target.value as any)}
          >
            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}★</option>)}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Interval</label>
          <select
            className="form-input"
            value={interval}
            onChange={e => setInterval(e.target.value as any)}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Frequency</label>
          <input
            type="number" min={1}
            className="form-input"
            value={frequency}
            onChange={e => setFrequency(+e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Duration (hrs)</label>
          <input
            type="number" min={0.25} step={0.25}
            className="form-input"
            value={duration}
            onChange={e => setDuration(+e.target.value)}
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
            onChange={e => setDescription(e.target.value)}
          />
        </div>

        <button type="submit" className="form-button">Add Chore</button>
      </form>

      {/* Live list of chores */}
      <ul className="mt-6 space-y-2">
        {chores.map(c => (
          <li key={c.id} className="border p-2 rounded flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{c.title}</h3>
              {c.description && <p className="text-sm">{c.description}</p>}
              <p className="text-xs text-gray-500">
                {c.frequency}× {c.interval}, {c.durationHours}h, effort {c.effortLevel}, imp {c.importance}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <button onClick={() => update(c.id, { title: c.title + ' ✏️' })} className="text-blue-600 text-sm">
                Edit
              </button>
              <button onClick={() => remove(c.id)} className="text-red-600 text-sm">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
