import React, { useState } from 'react';
import type { Resource, ResourceType } from '../domain/Resource';

const RESOURCE_OPTIONS: { value: ResourceType; label: string }[] = [
  { value: 'reference',      label: 'Reference' },
  { value: 'worked-example', label: 'Worked Example' },
  { value: 'practice',       label: 'Practice' },
  { value: 'key-insight',    label: 'Key Insight' },
];

interface AddResourceFormProps {
  conceptId: string;
  onAdd: (data: Omit<Resource, 'id'>) => Promise<any>;  // ← now accepts any Promise
}

export default function AddResourceForm({ conceptId, onAdd }: AddResourceFormProps) {
  const [type, setType]       = useState<ResourceType>('reference');
  const [title, setTitle]     = useState('');
  const [body, setBody]       = useState('');
  const [difficulty, setDiff] = useState<1|2|3>(2);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    await onAdd({
      conceptId,
      type,
      title: title.trim(),
      body: body.trim() || undefined,
      difficulty: (type === 'practice' || type === 'worked-example') ? difficulty : undefined,
    });
    setTitle(''); setBody(''); setDiff(2);
  };

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <select
        className="form-input"
        value={type}
        onChange={e => setType(e.target.value as ResourceType)}
      >
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
          onChange={e => setDiff(+e.target.value as any)}
        >
          {[1,2,3].map(n => (
            <option key={n} value={n}>Difficulty {n}</option>
          ))}
        </select>
      )}

      <textarea
        className="form-input"
        placeholder="Content (markdown)"
        rows={3}
        value={body}
        onChange={e => setBody(e.target.value)}
      />

      <button type="submit" className="form-button">
        Add {RESOURCE_OPTIONS.find(o => o.value === type)!.label}
      </button>
    </form>
  );
}
