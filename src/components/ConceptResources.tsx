import type { Resource } from '../domain/Resource';
import AddResourceForm from './AddResourceForm';
import '../styles/Table.css';
import { useState, useEffect } from 'react';

interface ResourceRowProps {
  resource: Resource;
  update: (id: string, patch: Partial<Resource>) => Promise<any>;
  remove: (id: string) => void;
}

function ResourceRow({ resource, update, remove }: ResourceRowProps) {
  const [title, setTitle] = useState(resource.title);
  const [importance, setImportance] = useState<1 | 2 | 3>(resource.importance ?? 2);
  const [difficulty, setDifficulty] = useState<1 | 2 | 3>(resource.difficulty ?? 2);
  const [accuracy, setAccuracy] = useState(resource.accuracy ?? 0);
  const [notes, setNotes] = useState(resource.notes);

  useEffect(() => {
    setTitle(resource.title);
    setImportance(resource.importance ?? 2);
    setDifficulty(resource.difficulty ?? 2);
    setAccuracy(resource.accuracy ?? 0);
    setNotes(resource.notes);
  }, [resource]);

  const handleUpdate = async (field: keyof Resource, value: any) => {
    await update(resource.id, { [field]: value });
  };

  return (
    <tr>
      <td>{resource.type.replace('-', ' ')}</td>

      <td>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          onBlur={() => handleUpdate('title', title)}
        />
      </td>

      <td>
        <select
          value={importance}
          onChange={e => {
            const raw = +e.target.value;
            if ([1, 2, 3].includes(raw)) {
              const val = raw as 1 | 2 | 3;
              setImportance(val);
              handleUpdate('importance', val);
            }
          }}
        >
          {[1, 2, 3].map(n => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </td>

      <td>
        {(resource.type === 'practice' || resource.type === 'worked-example') ? (
          <select
            value={difficulty}
            onChange={e => {
              const raw = +e.target.value;
              if ([1, 2, 3].includes(raw)) {
                const val = raw as 1 | 2 | 3;
                setDifficulty(val);
                handleUpdate('difficulty', val);
              }
            }}
          >
            {[1, 2, 3].map(n => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        ) : (
          '—'
        )}
      </td>

      <td>
        <input
          type="number"
          min={0}
          max={100}
          value={accuracy}
          onChange={e => setAccuracy(+e.target.value)}
          onBlur={() => handleUpdate('accuracy', accuracy)}
          style={{ width: '60px' }}
        />
      </td>

      <td>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          onBlur={() => handleUpdate('notes', notes)}
          rows={1}
          style={{ width: '100px' }}
        />
      </td>

      <td className="actions-cell">
        <button onClick={() => remove(resource.id)}>Delete</button>
      </td>
    </tr>
  );
}

interface ConceptResourcesProps {
  conceptId: string;
  resources: Resource[];
  add: (data: Omit<Resource, 'id'>) => Promise<any>;
  update: (id: string, patch: Partial<Resource>) => Promise<any>;
  remove: (id: string) => Promise<any>;
}

export default function ConceptResources({
  conceptId,
  resources,
  add,
  update,
  remove
}: ConceptResourcesProps) {
  return (
    <div>
      <AddResourceForm conceptId={conceptId} onAdd={add} />

      <table className="task-table mt-4">
        <thead>
          <tr>
            <th>Type</th>
            <th>Title</th>
            <th>Importance</th>
            <th>Difficulty</th>
            <th>Accuracy</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {resources.map(resource => (
            <ResourceRow
              key={resource.id}
              resource={resource}
              update={update}
              remove={remove}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
