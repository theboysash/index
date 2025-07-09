// src/domain/Task.ts

export interface TaskBase {
  id: string;            // temporary in-memory ID
  userId: string;        // owner of the task
  title: string;
  category: string;
  importance: 1 | 2 | 3 | 4 | 5;
  createdAt: Date;
  updatedAt: Date;
  effortLevel?: 1 | 2 | 3;
}

export interface OnceOffTask extends TaskBase {
  category: 'once-off';
  dueDate: Date;
  durationHours?: number;
  description: string;
}

export interface Chore extends TaskBase {
  category: 'chore';
  interval: 'daily' | 'weekly' | 'monthly';
  frequency: number;
  durationHours: number;
  description?: string;
  lastCompletedAt?: Date;    // ← new
}

export type HabitTag = 'Forming' | 'Building' | 'Established';

export interface RecurringTask extends TaskBase {
  interval: 'daily' | 'weekly' | 'monthly';
  frequency: number;
  durationHours: number;
  description?: string;
  lastCompletedAt?: Date;    // ← new
}

export interface HabitTask extends RecurringTask {
  category: 'habit';
  frequencyTarget: number;     // e.g. 3 times/week
  consistencyIndex: number;    // % value between 0–100
  familiarity: 0 | 1 | 2 | 3 | 4 | 5;  // how used to the habit the user is
  habitTag: HabitTag;          // auto-tagged habit status
  // `lastCompletedAt` is inherited from RecurringTask
}
