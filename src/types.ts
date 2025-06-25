// src/types.ts
import { Timestamp } from "firebase/firestore";

export interface Task {
  id: string;
  title: string;
  dueDate?: Timestamp;
  importance: 1|2|3|4|5;
  estimatedTime: number;
  difficulty: "Easy"|"Medium"|"Hard";
  contentType: string[];
  iterationCount: number;
  lastIterationAt: Timestamp;
  completedAt?: Timestamp;
}
