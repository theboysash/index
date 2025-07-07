import type { Test } from '../domain/Test';
import useCollection from './useCollection';

export default function useTests() {
  const userId = 'test-user';
  const { items, add } = useCollection<Test>('tests');

  const tests = items.filter((t: Test) => t.userId === userId);

  const create = async (test: Omit<Test, 'id'>) => {
    await add({ ...test });
  };

  return {
    tests,
    create,
  };
}
