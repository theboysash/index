// src/pages/SubjectDetailPage.tsx

import { useParams } from 'react-router-dom';
import useTopics from '../hooks/useTopic';       // ensure this matches your filename
import AddNodeForm from '../components/AddNodeForm';
import TopicNode from '../components/TopicNode';
import './SubjectDetailPage.css';

export default function SubjectDetailPage() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const { items: topics, add: addTopic } = useTopics(subjectId || null);

  return (
    <div className="subject-page">
      <h2 className="subject-title">Subject: {subjectId}</h2>

      {/* Always-visible Add Topic form */}
      <AddNodeForm
        nodeType="topic"
        parentId={subjectId || null}
        onAdd={(data) => addTopic(data as any)}
      />

      {/* If no topics yet, show a friendly message */}
      {topics.length === 0 ? (
        <p className="no-topics">No topics yet. Add one above!</p>
      ) : (
        topics.map((t) => (
          <div className="topic-card" key={t.id}>
            <TopicNode topic={t} />
          </div>
        ))
      )}
    </div>
  );
}
