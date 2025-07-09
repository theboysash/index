import React, { useState } from 'react';
import type { Resource, ResourceType } from '../domain/Resource';
import '../styles/AddResourceForm.css';

const RESOURCE_OPTIONS: { value: ResourceType; label: string }[] = [
  { value: 'reference', label: 'Reference' },
  { value: 'worked-example', label: 'Worked Example' },
  { value: 'practice', label: 'Practice' },
  { value: 'key-insight', label: 'Key Insight' },
];

interface AddResourceFormProps {
  conceptId: string;
  onAdd: (data: Omit<Resource, 'id'>) => Promise<any>;
}

export default function AddResourceForm({ conceptId, onAdd }: AddResourceFormProps) {
  const [type, setType] = useState<ResourceType>('reference');
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [difficulty, setDifficulty] = useState<1 | 2 | 3>(2);
  const [importance, setImportance] = useState<1 | 2 | 3>(2);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const data: Omit<Resource, 'id'> = {
      conceptId,
      type,
      title: title.trim(),
      importance,
      notes: notes.trim(),
      accuracy: 0, // set default accuracy
    };

    if (type === 'practice' || type === 'worked-example') {
      data.difficulty = difficulty;
    }

    await onAdd(data);

    setTitle('');
    setNotes('');
    setDifficulty(2);
    setImportance(2);
  };

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <div className="form-row">
        <select className="form-input" value={type} onChange={e => setType(e.target.value as ResourceType)}>
          {RESOURCE_OPTIONS.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>

        <input
          className="form-input"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />

        {(type === 'practice' || type === 'worked-example') && (
          <select
            className="form-input"
            value={difficulty}
            onChange={e => setDifficulty(+e.target.value as any)}
          >
            {[1, 2, 3].map(n => (
              <option key={n} value={n}>Difficulty {n}</option>
            ))}
          </select>
        )}

        <select
          className="form-input"
          value={importance}
          onChange={e => setImportance(+e.target.value as any)}
        >
          {[1, 2, 3].map(n => (
            <option key={n} value={n}>Importance {n}</option>
          ))}
        </select>
      </div>

      <textarea
        className="form-input arf-notes"
        placeholder="Notes (optional)"
        value={notes}
        onChange={e => setNotes(e.target.value)}
      />

      <button type="submit" className="form-button center-button">
        Add {RESOURCE_OPTIONS.find(o => o.value === type)?.label}
      </button>
    </form>
  );
}
