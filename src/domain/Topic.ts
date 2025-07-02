export interface Topic {
  id: string;
  subjectId: string;
  name: string;
  orderIndex?: number;
  parentTopicId?: string | null;
}