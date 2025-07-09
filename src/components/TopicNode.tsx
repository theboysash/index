// src/components/TopicNode.tsx

import { useState } from 'react';
import type { Topic } from '../domain/Topic';
import useConcepts from '../hooks/useConcept';
import AddNodeForm from './AddNodeForm';
import ConceptNode from './ConceptNode';
import useTopics from '../hooks/useTopic';

export default function TopicNode({ topic }: { topic: Topic }) {
  const [expanded, setExpanded] = useState(false); // 🔻 start collapsed
  const { items: subTopics, add: addSub } = useTopics(topic.id);
  const { items: concepts, add: addConc } = useConcepts(topic.id);

  return (
    <div style={{ marginLeft: 20, marginBottom: 30 }}>
      <div className="topic-header" onClick={() => setExpanded(prev => !prev)}>
        <h4 className="topic-title">{topic.name}</h4>
        <span style={{ cursor: 'pointer' }}>{expanded ? '▲' : '▼'}</span>
      </div>

      {expanded && (
        <div className="topic-content">
          {subTopics.map(st => (
            <TopicNode key={st.id} topic={st} />
          ))}

          {concepts.map(c => (
            <ConceptNode key={c.id} concept={c} />
          ))}

          <AddNodeForm nodeType="topic" parentId={topic.id} onAdd={(d) => addSub(d as any)} />
          <AddNodeForm nodeType="concept" parentId={topic.id} onAdd={(d) => addConc(d as any)} />
        </div>
      )}
    </div>
  );
}
