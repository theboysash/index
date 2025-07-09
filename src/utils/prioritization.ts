// src/utils/prioritization.ts

import type { OnceOffTask, Chore, HabitTask } from '../domain/Task';
import type { Resource } from '../domain/Resource';
import type { Concept } from '../domain/Concept';

const MS_PER_DAY = 1000 * 60 * 60 * 24;
const today = new Date();

function daysUntil(date: Date): number {
  return Math.max(0, Math.ceil((date.getTime() - today.getTime()) / MS_PER_DAY));
}

function daysSince(date: Date): number {
  return Math.max(0, Math.ceil((today.getTime() - date.getTime()) / MS_PER_DAY));
}

// ---- ONCE-OFF TASK PRIORITY ----
export function scoreOnceOff(task: OnceOffTask): number {
  const importance = task.importance;
  const dueDays = daysUntil(task.dueDate);
  const urgency = 1 / Math.exp(dueDays / 3);  // exponential spike
  const bonus = dueDays === 0 ? 2 : 1;        // double score if due today
  const cost = (task.durationHours ?? 1) * (1 + 0.5 * ((task.effortLevel ?? 2) - 1));
  return (importance ** 2) * urgency * bonus / cost;
}
// ---- CHORE PRIORITY ----
export function scoreChore(task: Chore): number {
  const importance = task.importance;
  const intervalDays = task.interval === 'daily' ? 1 : task.interval === 'weekly' ? 7 : 30;
  const since = task.lastCompletedAt ? daysSince(task.lastCompletedAt) : intervalDays * 2;
  const overdueRatio = since / intervalDays;
  const cost = task.durationHours * (1 + 0.5 * ((task.effortLevel ?? 2) - 1));
  return (importance * overdueRatio) / cost;
}

// ---- HABIT PRIORITY ----
export function scoreHabit(task: HabitTask): number {
  const importance = task.importance;
  const since = task.lastCompletedAt ? daysSince(task.lastCompletedAt) : 7;
  const intDays = task.interval === 'daily' ? 1 : task.interval === 'weekly' ? 7 : 30;
  const urgencyBoost = since / intDays;
  const consistencyPenalty = 1 - task.consistencyIndex / 100;
  const familiarityPenalty = 1 - task.familiarity / 5;
  const cost = task.durationHours * (1 + 0.5 * ((task.effortLevel ?? 2) - 1));
  return (importance * urgencyBoost * consistencyPenalty * familiarityPenalty) / cost;
}

// ---- RESOURCE PRIORITY ----
export function scoreResource(resource: Resource, concept: Concept): number {
  const I = (resource.importance ?? 2) / 3;
  const D = (resource.difficulty ?? 2) / 3;
  const A = 1 - (resource.accuracy ?? 0) / 100;
  const daysToTest = concept.testDate ? daysUntil(concept.testDate) : Infinity;
  const Utest = concept.testDate ? 1 / Math.exp(daysToTest / 7) : 0;
  const daysRev = resource.lastReviewedAt ? daysSince(resource.lastReviewedAt) : Infinity;
  const Urev = Math.min(daysRev / 7, 1);
  return I * D * A + Utest + Urev;
}

// ---- GENERAL SORT COMPARATOR ----
export function compareByScore<T>(a: T, b: T, scorer: (t: T) => number): number {
  return scorer(b) - scorer(a);
}
