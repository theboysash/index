
import type { Topic } from '../domain/Topic';
import useConcepts from '../hooks/useConcept';
import AddNodeForm from './AddNodeForm';
import ConceptNode from './ConceptNode';
import useTopics from '../hooks/useTopic';

export default function TopicNode({ topic }: { topic: Topic }) {
  // ✅ THIS IS THE KEY FIX:
  const { items: subTopics, add: addSub } = useTopics(topic.id); // ← topic.id is the parentTopicId
  const { items: concepts, add: addConc } = useConcepts(topic.id);

  return (
    <div style={{ marginLeft: 20 }}>
      <h4>{topic.name}</h4>

      {/* Render child topics recursively */}
      {subTopics.map((st) => (
        <TopicNode key={st.id} topic={st} />
      ))}

      {/* Render concepts */}
      {concepts.map((c) => (
        <ConceptNode key={c.id} concept={c} />
      ))}

      <AddNodeForm nodeType="topic" parentId={topic.id} onAdd={(d) => addSub(d as any)} />
      <AddNodeForm nodeType="concept" parentId={topic.id} onAdd={(d) => addConc(d as any)} />
    </div>
  );
}
