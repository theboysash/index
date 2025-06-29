// src/components/TaskList.tsx
import { useEffect, useState } from "react";
import {
  onSnapshot,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import {
  tasksCol,
  updateTask,
  deleteTask,
} from "../taskService";
import type { Task } from "../types";
import { scoreTask } from "../utils/scoreTask";

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showCompleted, setShowCompleted] = useState(false);
  const [showArchived, setShowArchived] = useState(false);

  useEffect(() => {
    const q = query(tasksCol, where("userId", "==", "test-user"));
    const unsub = onSnapshot(q, snap => {
      const arr = snap.docs.map(doc => {
        const data = doc.data() as Omit<Task, "id">;
        return { id: doc.id, ...data };
      })
      // sort by priority
      arr.sort((a,b) => scoreTask(b) - scoreTask(a));
      // filter archived / completed
      const filtered = arr.filter(t => {
        if (!showCompleted && t.completedAt) return false;
        if (!showArchived && t.archived)    return false;
        return true;
      });
      setTasks(filtered);
    });
    return () => unsub();
  }, [showCompleted, showArchived]);

  const handleComplete = (id: string) => {
    updateTask(id, { completedAt: Timestamp.now() });
  };

  const handleArchive = (id: string) => {
    updateTask(id, { archived: true });
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete permanently?")) deleteTask(id);
  };

  return (
    <div>
      <div className="task-list-controls">
        <label>
          <input
            type="checkbox"
            checked={showCompleted}
            onChange={() => setShowCompleted(prev => !prev)}
          /> Show Completed
        </label>
        <label style={{marginLeft:16}}>
          <input
            type="checkbox"
            checked={showArchived}
            onChange={() => setShowArchived(prev => !prev)}
          /> Show Archived
        </label>
      </div>
      <ul className="task-list">
        {tasks.map(t => (
          <li key={t.id} className="task-card">
            <input
              type="checkbox"
              checked={!!t.completedAt}
              onChange={() => handleComplete(t.id)}
            />
            <strong>{t.title}</strong>
            <div>
              <small>Due: {t.dueDate?.toDate().toLocaleDateString() || "—"}</small>
            </div>
            <div>
              <button onClick={() => handleArchive(t.id)}>Archive</button>
              <button onClick={() => handleDelete(t.id)} style={{marginLeft:8}}>🗑️</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
