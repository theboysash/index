export type ResourceType =
  | 'reference'
  | 'worked-example'
  | 'practice'
  | 'key-insight';

export interface Resource {
  id: string;
  conceptId: string;
  type: ResourceType;
  title: string;
  notes: string;
  body?: string;
  difficulty?: 1 | 2 | 3;
  importance?: 1 | 2 | 3;
  lastReviewedAt?: Date;
  accuracy?: number; // NEW FIELD
}
