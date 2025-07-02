import React, { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import type { Chore } from '../domain/Task';
import '../styles/forms.css';
import '../styles/Table.css';

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

      

      {/* Table of chores */}
      <table className="task-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Frequency</th>
            <th>Interval</th>
            <th>Duration</th>
            <th>Effort</th>
            <th>Importance</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {chores.map((c) => (
            <tr key={c.id}>
              <td>{c.title}</td>
              <td>{c.description}</td>
              <td>{c.frequency}</td>
              <td>{c.interval}</td>
              <td>{c.durationHours}h</td>
              <td>{c.effortLevel}</td>
              <td>{c.importance}★</td>
              <td className="actions-cell">
                <button onClick={() => update(c.id, { title: c.title + ' ✏️' })}>Edit</button>
                <button onClick={() => remove(c.id)}>Delete</button>
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
    </div>
  );
}
