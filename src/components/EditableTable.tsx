// src/components/EditableCell.tsx
import { useState } from 'react';

interface Props {
  value: string | number;
  onChange: (val: string) => void;
  type?: 'text' | 'number' | 'select' | 'date';  // ← added 'date'
  options?: string[]; // supports string arrays
}

export function EditableCell({ value, onChange, type = 'text', options }: Props) {
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState(String(value));

  const handleBlur = () => {
    setEditing(false);
    if (String(value) !== input) {
      onChange(input);
    }
  };

  return (
    <td onClick={() => setEditing(true)} style={{ cursor: 'pointer' }}>
      {editing ? (
        type === 'select' && options ? (
          <select
            value={input}
            onChange={e => setInput(e.target.value)}
            onBlur={handleBlur}
            autoFocus
          >
            {options.map(opt => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            value={input}
            onChange={e => setInput(e.target.value)}
            onBlur={handleBlur}
            autoFocus
          />
        )
      ) : (
        <span>{value}</span>
      )}
    </td>
  );
}
