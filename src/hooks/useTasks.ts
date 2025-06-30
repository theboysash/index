import { useEffect, useState, useCallback } from 'react';
import { taskRepo } from '../services';          // ← exports one repo instance
import type { TaskBase } from '../domain/Task';

/**
 * Subscribe to tasks of a single category, expose CRUD helpers.
 */
export function useTasks<T extends TaskBase>(category: T['category']) {
  const [tasks, setTasks] = useState<T[]>([]);

  /** ---- live subscription ---- */
  useEffect(() => {
    const unsub = taskRepo.onList<T>(category, setTasks);
    return () => unsub();                       // clean up on unmount
  }, [category]);

  /** ---- helpers that forward to the repo ---- */
  const create = useCallback(
    (data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>) =>
      taskRepo.create<T>(data),
    []
  );

  const update = useCallback(
    (id: string, patch: Partial<T>) => taskRepo.update<T>(id, patch),
    []
  );

  const remove = useCallback(
    (id: string) => taskRepo.delete(id),
    []
  );

  return { tasks, create, update, remove };
}
