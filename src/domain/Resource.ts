// src/domain/Resource.ts

export type ResourceType =
  | 'reference'
  | 'worked-example'
  | 'practice'
  | 'key-insight';

export interface Resource {
  notes: string;
  id: string;
  conceptId: string;
  type: ResourceType;
  title: string;
  body?: string;                  // the main content (definition, exercise text…)
  difficulty?: 1 | 2 | 3;         // optional, for Practice or Examples
  tags?: string[];                // e.g. ['separation-axioms']
  lastReviewedAt?: Date;
  importance?: 1 | 2 | 3; // ← Add this line


}
