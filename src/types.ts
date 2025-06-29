// src/types.ts
import { Timestamp } from "firebase/firestore";

export interface Task {
  id: string;
  userId: string;
  title: string;
  dueDate?: Timestamp;
  importance: 1|2|3|4|5;
  estimatedTime: number;
  difficulty: "Easy"|"Medium"|"Hard";
  contentType: string[];
  iterationCount: number;
  lastIterationAt: Timestamp;
  /** NEW: when it was marked complete */
  completedAt?: Timestamp;
  /** NEW: soft-delete flag */
  archived?: boolean;
  /** NEW (optional): for daily habits */
  recurrence?: "daily"|"weekly"|"monthly";
  /** NEW: last time a recurring task was done */
  lastDoneAt?: Timestamp;
}
