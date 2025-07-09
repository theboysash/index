// src/pages/HomePage.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useTasks } from '../hooks/useTasks';
import useCollection from '../hooks/useCollection';
import type { OnceOffTask, Chore, HabitTask } from '../domain/Task';
import type { Resource } from '../domain/Resource';
import type { Concept } from '../domain/Concept';
import {
  scoreOnceOff,
  scoreChore,
  scoreHabit,
  scoreResource,
} from '../utils/prioritization';
import './HomePage.css';

// Category definitions (used for both flip-cards and icons)
const categories = [
  { id: 'once-off', label: 'Once-off', icon: '📌', back: 'Create one-off tasks here' },
  { id: 'study',    label: 'Study',    icon: '📚', back: 'Track your study sessions' },
  { id: 'habit',    label: 'Habit',    icon: '🔄', back: 'Daily habit tracker' },
  { id: 'chore',    label: 'Chore',    icon: '🧹', back: 'Household chores' },
  { id: 'resource', label: 'Resource', icon: '📖', back: 'Your study resources' },
];

// Icon lookup by category
const iconMap: Record<string, string> = {
  'once-off': '📌',
  'study':    '📚',
  'habit':    '🔄',
  'chore':    '🧹',
  'resource': '📖',
};

export default function HomePage() {
  // Fetch tasks & resources
  const { tasks: onceOffTasks } = useTasks<OnceOffTask>('once-off');
  const { tasks: chores }       = useTasks<Chore>('chore');
  const { tasks: habits }       = useTasks<HabitTask>('habit');
  const { items: concepts }     = useCollection<Concept>('concepts', []);
  const { items: resources }    = useCollection<Resource>('resources', []);

  // Score each list
  const scoredTasks = [
    ...onceOffTasks.map(t => ({ ...t, score: scoreOnceOff(t) })),
    ...chores      .map(c => ({ ...c, score: scoreChore(c) })),
    ...habits      .map(h => ({ ...h, score: scoreHabit(h) })),
  ];

  const scoredResources = resources
    .map(r => {
      const concept = concepts.find(c => c.id === r.conceptId);
      if (!concept) return null;
      return {
        ...r,
        score: scoreResource(r, concept),
        category: 'resource' as const,
        title: r.title,
        schedule: concept.testDate?.toLocaleDateString() || '—',
        importance: r.importance ?? 2,
      };
    })
    .filter(Boolean) as Array<Resource & {
      score: number;
      category: 'resource';
      title: string;
      schedule: string;
      importance: number;
    }>;

  // Merge & sort
  type AnyItem = {
    id: string;
    category: string;
    title: string;
    score: number;
    importance: number;
    schedule: string;
    duration?: number;
    effortLevel?: number;
  };

  const allItems: AnyItem[] = [
    ...scoredTasks.map(t => ({
      id: t.id,
      category: t.category,
      title: t.title,
      score: t.score,
      importance: t.importance,
      schedule:
        t.category === 'once-off'
          ? (t as OnceOffTask).dueDate.toLocaleDateString()
          : (t as Chore | HabitTask).interval,
      duration: (t as any).durationHours,
      effortLevel: (t as any).effortLevel,
    })),
    ...scoredResources.map(r => ({
      id: r.id,
      category: r.category,
      title: r.title,
      score: r.score,
      importance: r.importance,
      schedule: r.schedule,
      duration: undefined,
      effortLevel: undefined,
    })),
  ].sort((a, b) => b.score - a.score);

  // Top 3 from the real list
  const top3 = allItems.slice(0, 3);

  return (
    <div className="p-6 space-y-12">
      {/* Top 3 Priority Tasks (dynamic) */}
      <h2 className="text-2xl font-bold">Top 3 Priorities</h2>
      <div className="task-cards">
        {top3.map((item, idx) => (
          <div key={item.id} className={`vertical-card gradient-${idx % 3}`}>
            <div className="card-header">
              <span className="card-icon">{iconMap[item.category] || '❓'}</span>
              <h3 className="card-title">{item.title}</h3>
            </div>
            <div className="card-footer">{item.schedule}</div>
          </div>
        ))}
      </div>

      {/* Category flip-cards */}
      <h2 className="text-2xl font-bold">Categories</h2>
      <div className="category-flip-cards">
        {categories.map(cat => (
          <Link to={`/${cat.id}`} key={cat.id} className="flip-card-link">
            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <div className="front-icon">{cat.icon}</div>
                  <p className="title">{cat.label}</p>
                </div>
                <div className="flip-card-back">
                  <p className="title">{cat.back}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* All Items by Priority */}
      <h2 className="text-2xl font-bold">All Items by Priority</h2>
      <table className="task-table w-full">
        <thead>
          <tr>
            <th>Category</th>
            <th>Title</th>
            <th>Schedule</th>
            <th>Importance</th>
            <th>Duration (h)</th>
            <th>Effort</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {allItems.map(item => (
            <tr key={item.id}>
              <td>{item.category}</td>
              <td>{item.title}</td>
              <td>{item.schedule}</td>
              <td>{item.importance}★</td>
              <td>{item.duration ?? '—'}</td>
              <td>{
                item.effortLevel === 1 ? 'Light'
                : item.effortLevel === 2 ? 'Medium'
                : item.effortLevel === 3 ? 'Heavy'
                : '—'
              }</td>
              <td>{item.score.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
