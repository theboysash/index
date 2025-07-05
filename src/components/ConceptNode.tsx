
import type { Concept } from '../domain/Concept';
import { useResources } from '../hooks/useResources';
import AddResourceForm from './AddResourceForm';
import type { Resource } from '../domain/Resource';

export default function ConceptNode({ concept }: { concept: Concept }) {
  const { items: resources, add: addRes } = useResources(concept.id);

  return (
    <div style={{ marginLeft: 20 }}>
      <h5 className="font-semibold mb-2">{concept.title}</h5>

      {/* Inline list of existing resources */}
      {resources.map((r: Resource) => (
        <div key={r.id} className="mb-1">
          {r.title}
        </div>
      ))}

      {/* Add any type of resource */}
      <AddResourceForm conceptId={concept.id} onAdd={addRes} />
    </div>
  );
}
