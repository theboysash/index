// src/utils/scoreTask.ts
import type { Task } from "../types";
import { Timestamp } from "firebase/firestore";

/**
 * Computes a priority score for a task.
 * Higher is “more urgent/important per unit effort.”
 */
export function scoreTask(task: Task): number {
  const { importance, estimatedTime, dueDate } = task;

  // Base score if no due date: importance ÷ time
  if (!dueDate) {
    return importance / estimatedTime;
  }

  // Otherwise factor in days until due
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysToDue = Math.max(
    1,
    (dueDate.toMillis() - Date.now()) / msPerDay
  );

  return (importance / estimatedTime) / daysToDue;
}
