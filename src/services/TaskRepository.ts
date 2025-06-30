// src/services/TaskRepository.ts
export interface TaskRepository {
  /**
   * Create a new task document.
   * Returns the generated document ID.
   */
  create<T>(
    data: Omit<T, 'id' | 'createdAt' | 'updatedAt'> & { userId: string; category: string }
  ): Promise<string>;

  /**
   * Subscribe to live updates for tasks in a given category.
   * Calls the callback with the current array of tasks on every change.
   * Returns an unsubscribe function.
   */
  onList<T>(
    category: string,
    callback: (tasks: (T & { id: string; createdAt: Date; updatedAt: Date })[]) => void
  ): () => void;

  /**
   * Update fields on an existing task.
   */
  update<T>(
    id: string,
    data: Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<void>;

  /**
   * Delete a task document by ID.
   */
  delete(id: string): Promise<void>;
}
