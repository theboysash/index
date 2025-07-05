
import type { Resource } from '../domain/Resource';
import AddResourceForm from './AddResourceForm';
import '../styles/Table.css';

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
            <th>Difficulty</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {resources.map(r => (
            <tr key={r.id}>
              <td>{r.type.replace('-', ' ')}</td>
              <td>{r.title}</td>
              <td>{r.difficulty ?? '—'}</td>
              <td className="actions-cell">
                <button onClick={() => update(r.id, { title: r.title + ' ✏️' })}>
                  Edit
                </button>
                <button onClick={() => remove(r.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
