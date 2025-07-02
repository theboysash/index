export type ResourceType =
  | 'definition'
  | 'theorem'
  | 'general'
  | 'exercise'
  | 'tutorial'
  | 'past-test';

export interface Resource {
  id: string;
  conceptId: string;
  type: ResourceType;
  title?: string;
  body?: string;
  notes?: string;
  mastery?: number;
  lastReviewedAt?: Date;
}