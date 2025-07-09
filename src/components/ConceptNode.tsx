// src/components/ConceptNode.tsx

import { useState } from 'react';
import type { Concept } from '../domain/Concept';
import { useResources } from '../hooks/useResources';
import ConceptResources from './ConceptResources';

export default function ConceptNode({ concept }: { concept: Concept }) {
  const [expanded, setExpanded] = useState(false); // 🔻 start collapsed
  const { items: resources, add, update, remove } = useResources(concept.id);

  return (
    <div style={{ marginLeft: 20, marginBottom: 40 }}>
      <div className="concept-header" onClick={() => setExpanded(prev => !prev)}>
        <h5 className="concept-title">{concept.title}</h5>
        <span style={{ cursor: 'pointer' }}>{expanded ? '▲' : '▼'}</span>
      </div>

      {expanded && (
        <ConceptResources
          conceptId={concept.id}
          resources={resources}
          add={add}
          update={update}
          remove={remove}
        />
      )}
    </div>
  );
}
