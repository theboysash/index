import type { Subject } from "../domain/Subject";

// src/services/SubjectRepository.ts
export interface SubjectRepository {
  create(data: Omit<Subject, 'id' | 'createdAt' | 'updatedAt'> & { userId: string }): Promise<string>;
  onList(userId: string, callback: (subs: (Subject & { id: string; createdAt: Date; updatedAt: Date })[]) => void): () => void;
  update(id: string, data: Partial<Omit<Subject, 'id' | 'createdAt' | 'updatedAt'>>): Promise<void>;
  delete(id: string): Promise<void>;
}
