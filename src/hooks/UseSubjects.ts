import useCollection from './useCollection';
import type { Subject } from '../domain/Subject';

export default function useSubjects() {
  const { items, add, update, remove } = useCollection<Subject>('subjects'); // ✅ No where() filter
  return {
    subjects: items,
    create: add,
    update,
    remove,
  };
}
