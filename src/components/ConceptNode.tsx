// src/components/ConceptNode.tsx
 
import type { Concept } from '../domain/Concept';
import { useResources } from '../hooks/useResources';
import ConceptResources from './ConceptResources';

export default function ConceptNode({ concept }: { concept: Concept }) {
  const { items: resources, add, update, remove } = useResources(concept.id);

  return (
    <div style={{ marginLeft: 20, marginBottom: 40 }}>
      <h5 className="font-semibold text-lg mb-4">{concept.title}</h5>
      <ConceptResources
        conceptId={concept.id}
        resources={resources}
        add={add}
        update={update}
        remove={remove}
      />
    </div>
  );
}
