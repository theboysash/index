import type { Concept } from '../domain/Concept';
import { useResources } from '../hooks/useResources';
import AddNodeForm from './AddNodeForm';
import type { Resource } from '../domain/Resource';

export default function ConceptNode({ concept }: { concept: Concept }) {
  const { items: resources, add: addRes } = useResources(concept.id);

  return (
    <div style={{ marginLeft: 20 }}>
      <h5>{concept.title}</h5>
      {resources.map((r: Resource) => (
        <div key={r.id}>{r.title || r.type}</div>
      ))}
      <AddNodeForm nodeType="definition" parentId={concept.id} onAdd={(d) => addRes(d as any)} />
    </div>
  );
}