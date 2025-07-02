import { where } from 'firebase/firestore';
import useCollection from './useCollection';
import type { Resource } from '../domain/Resource';

export function useResources(conceptId: string | null) {
  return useCollection<Resource>('resources', [
    where('conceptId', '==', conceptId),
  ]);
}