import React, { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import type { HabitTask } from '../domain/Task';
import '../styles/forms.css';
import '../styles/Table.css';

const habitTags: HabitTask['habitTag'][] = ['Forming', 'Building', 'Established'];

export default function HabitPage() {
  const { tasks: habits, create, update, remove } = useTasks<HabitTask>('habit');

  const [title, setTitle] = useState('');
  const [importance, setImportance] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [interval, setInterval] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [frequency, setFrequency] = useState<number>(1);
  const [duration, setDuration] = useState<number>(1);
  const [frequencyTarget, setFrequencyTarget] = useState<number>(3);
  const [familiarity, setFamiliarity] = useState<0 | 1 | 2 | 3 | 4 | 5>(0);
  const [description, setDescription] = useState('');

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    await create({
      userId: 'test-user',
      category: 'habit',
      title,
      importance,
      interval,
      frequency,
      durationHours: duration,
      frequencyTarget,
      consistencyIndex: 0,
      familiarity,
      habitTag: habitTags[familiarity],
      description,
    });
    setTitle('');
    setImportance(3);
    setInterval('daily');
    setFrequency(1);
    setDuration(1);
    setFrequencyTarget(3);
    setFamiliarity(0);
    setDescription('');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Habits</h1>

      

      {/* Live list of habits as a table */}
      <table className="task-table mt-6">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Interval</th>
            <th>Freq</th>
            <th>Target</th>
            <th>Duration (h)</th>
            <th>Importance</th>
            <th>Familiarity</th>
            <th>Tag</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {habits.map((h) => (
            <tr key={h.id}>
              <td>{h.title}</td>
              <td>{h.description || '—'}</td>
              <td>{h.interval}</td>
              <td>{h.frequency}</td>
              <td>{h.frequencyTarget}</td>
              <td>{h.durationHours}</td>
              <td>{h.importance}★</td>
              <td>{h.familiarity}</td>
              <td>{h.habitTag}</td>
              <td className="actions-cell">
                <button onClick={() => update(h.id, { title: h.title + ' ✏️' })}>
                  Edit
                </button>
                <button onClick={() => remove(h.id)}>Delete</button>
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
          <label className="form-label">Importance</label>
          <select
            className="form-input"
            value={importance}
            onChange={(e) => setImportance(+e.target.value as any)}
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}★
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Interval</label>
          <select
            className="form-input"
            value={interval}
            onChange={(e) => setInterval(e.target.value as any)}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Frequency</label>
          <input
            type="number"
            min={1}
            className="form-input"
            value={frequency}
            onChange={(e) => setFrequency(+e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Duration (hrs)</label>
          <input
            type="number"
            min={0.25}
            step={0.25}
            className="form-input"
            value={duration}
            onChange={(e) => setDuration(+e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Familiarity</label>
          <select
            className="form-input"
            value={familiarity}
            onChange={(e) => setFamiliarity(+e.target.value as any)}
          >
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Freq. Target</label>
          <input
            type="number"
            min={1}
            className="form-input"
            value={frequencyTarget}
            onChange={(e) => setFrequencyTarget(+e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            className="form-input"
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button type="submit" className="form-button">Add Habit</button>
      </form>
    </div>
  );
}
