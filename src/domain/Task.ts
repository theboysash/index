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

  category: 'chore'
  interval: 'daily' |'weekly' | 'monthly' ;
  frequency: number;
  durationHours: number;
  description?: string;

}

export type HabitTag = 'Forming' | 'Building' | 'Established';

// If you haven't defined RecurringTask yet, define it like this:
export interface RecurringTask extends TaskBase {
  interval: 'daily' | 'weekly' | 'monthly';
  frequency: number;
  durationHours: number;
  description?: string;
}

// Habit task extends recurring with extra habit-specific fields
export interface HabitTask extends RecurringTask {
  category: 'habit';
  frequencyTarget: number;     // e.g. 3 times/week
  consistencyIndex: number;    // % value between 0–100
  familiarity: 0 | 1 | 2 | 3 | 4 | 5;  // how used to the habit the user is
  habitTag: HabitTag;          // auto-tagged habit status
}