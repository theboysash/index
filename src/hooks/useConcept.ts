import { where } from 'firebase/firestore';
import useCollection from './useCollection';
import type { Concept } from '../domain/Concept';

export default function useConcepts(topicId: string | null) {
  return useCollection<Concept>('concepts', [where('topicId', '==', topicId)]);
}