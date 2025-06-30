// src/pages/HabitPage.tsx
import React, { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import type { HabitTask } from '../domain/Task';
import '../styles/forms.css';

const habitTags: HabitTask['habitTag'][] = ['Forming', 'Building', 'Established'];

export default function HabitPage() {
  const { tasks: habits, create, update, remove } = useTasks<HabitTask>('habit');

  const [title, setTitle] = useState('');
  const [importance, setImportance] = useState<1|2|3|4|5>(3);
  const [interval, setInterval] = useState<'daily'|'weekly'|'monthly'>('daily');
  const [frequency, setFrequency] = useState<number>(1);
  const [duration, setDuration] = useState<number>(1);
  const [frequencyTarget, setFrequencyTarget] = useState<number>(3);
  const [familiarity, setFamiliarity] = useState<0|1|2|3|4|5>(0);
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
    // reset
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
          <label className="form-label">Familiarity</label>
          <select
            className="form-input"
            value={familiarity}
            onChange={e => setFamiliarity(+e.target.value as any)}
          >
            {[0,1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Freq. Target</label>
          <input
            type="number" min={1}
            className="form-input"
            value={frequencyTarget}
            onChange={e => setFrequencyTarget(+e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            className="form-input"
            rows={2}
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>

        <button type="submit" className="form-button">Add Habit</button>
      </form>

      {/* Live list of habits */}
      <ul className="mt-6 space-y-2">
        {habits.map(h => (
          <li key={h.id} className="border p-2 rounded flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{h.title}</h3>
              {h.description && <p className="text-sm">{h.description}</p>}
              <p className="text-xs text-gray-500">
                {h.frequencyTarget}×/{h.interval}, {h.durationHours}h, familiarity {h.familiarity}, tag {h.habitTag}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <button onClick={() => update(h.id, { title: h.title + ' ✏️' })} className="text-blue-600 text-sm">
                Edit
              </button>
              <button onClick={() => remove(h.id)} className="text-red-600 text-sm">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
