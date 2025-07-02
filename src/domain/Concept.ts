export type Difficulty = 'intro' | 'standard' | 'challenge';

export interface Concept {
  id: string;
  topicId: string;
  title: string;
  blurb?: string;
  difficulty?: Difficulty;
  importance?: number;
  prerequisiteIds?: string[];
  notes?: string;
  mastery?: number;
  lastReviewedAt?: Date;
}
