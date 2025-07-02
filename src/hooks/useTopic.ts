import { where } from 'firebase/firestore';
import useCollection from './useCollection';
import { type Topic } from '../domain/Topic';

// ✅ CHANGED: Only filter by subjectId — removed parentTopicId filter
export default function useTopics(subjectId: string | null) {
  return useCollection<Topic>('topics', [
    where('subjectId', '==', subjectId),
  ]);
}