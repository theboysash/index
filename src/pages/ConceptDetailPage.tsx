
import { useParams } from 'react-router-dom';
import { useResources } from '../hooks/useResources';
import ConceptResources from '../components/ConceptResources';

export default function ConceptDetailPage() {
  const { conceptId } = useParams<{ conceptId: string }>();
  const { items: resources, add, update, remove } =
    useResources(conceptId || null);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Concept: {conceptId}</h1>

      {conceptId && (
        <ConceptResources
          conceptId={conceptId}
          resources={resources}
          add={add}
          update={update}
          remove={remove}
        />
      )}
    </div>
  );
}
