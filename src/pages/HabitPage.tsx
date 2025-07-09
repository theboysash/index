import React, { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import type { HabitTask } from '../domain/Task';
import '../styles/forms.css';
import '../styles/Table.css';
import { EditableCell } from '../components/EditableTable';

const habitTags: HabitTask['habitTag'][] = ['Forming', 'Building', 'Established'];

export default function HabitPage() {
  const { tasks: habits, create, update, remove } = useTasks<HabitTask>('habit');

  const [title, setTitle] = useState('');
  const [importance, setImportance] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [interval, setInterval] = useState<'daily' | 'weekly' | 'monthly'>('daily');
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
  durationHours: duration,
  frequencyTarget,
  consistencyIndex: 0,
  familiarity,
  habitTag: habitTags[familiarity],
  description,
  frequency: 0
});

    setTitle('');
    setImportance(3);
    setInterval('daily');
    setDuration(1);
    setFrequencyTarget(3);
    setFamiliarity(0);
    setDescription('');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Habits</h1>

      <table className="task-table mt-6">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Interval</th>
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
              <EditableCell value={h.title} onChange={(v) => update(h.id, { title: v })} />
              <EditableCell value={h.description || ''} onChange={(v) => update(h.id, { description: v })} />
              <EditableCell
                value={h.interval}
                type="select"
                options={['daily', 'weekly', 'monthly']}
                onChange={(v) => update(h.id, { interval: v as any })}
              />
              <EditableCell
                value={h.frequencyTarget}
                type="number"
                onChange={(v) => update(h.id, { frequencyTarget: Number(v) })}
              />
              <EditableCell
                value={h.durationHours}
                type="number"
                onChange={(v) => update(h.id, { durationHours: Number(v) })}
              />
              <EditableCell
                value={h.importance}
                type="select"
                options={['1', '2', '3', '4', '5']}
                onChange={(v) => update(h.id, { importance: Number(v) as 1 | 2 | 3 | 4 | 5 })}
              />
              <EditableCell
                value={h.familiarity}
                type="select"
                options={['0', '1', '2', '3', '4', '5']}
                onChange={(v) => update(h.id, { familiarity: Number(v) as 0 | 1 | 2 | 3 | 4 | 5 })}
              />
              <EditableCell
                value={h.habitTag}
                type="select"
                options={habitTags}
                onChange={(v) => update(h.id, { habitTag: v as HabitTask['habitTag'] })}
              />
              <td className="actions-cell">
                <button onClick={() => remove(h.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form className="colorful-form mt-10" onSubmit={handleAdd}>
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
          <label className="form-label">Description</label>
          <input
            className="form-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
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
          <label className="form-label">Target Frequency</label>
          <input
            type="number"
            className="form-input"
            value={frequencyTarget}
            onChange={(e) => setFrequencyTarget(Number(e.target.value))}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Duration (h)</label>
          <input
            type="number"
            className="form-input"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Importance</label>
          <select
            className="form-input"
            value={importance}
            onChange={(e) => setImportance(Number(e.target.value) as 1 | 2 | 3 | 4 | 5)}
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Familiarity</label>
          <select
            className="form-input"
            value={familiarity}
            onChange={(e) => setFamiliarity(Number(e.target.value) as 0 | 1 | 2 | 3 | 4 | 5)}
          >
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
        <button className="form-button mt-4" type="submit">Add Habit</button>
      </form>
    </div>
  );
}
