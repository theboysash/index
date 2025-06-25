import { useEffect, useState } from "react";
import { onSnapshot, query, where } from "firebase/firestore";
import { tasksCol } from "../taskService";
import type { Task } from "../types";
import { scoreTask } from "../utils/scoreTask";

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // real-time listener for “test-user”
    const q = query(tasksCol, where("userId", "==", "test-user"));
    const unsub = onSnapshot(q, snap => {
      const arr = snap.docs.map(doc => {
  // 1) Grab the plain JS data and assert it matches our Task shape (minus `id`):
  const data = doc.data() as Omit<Task, "id">;
  // 2) Return a full Task object by explicitly adding `id` back in:
  return { id: doc.id, ...data };
});
      // compute scores & sort
      arr.sort((a, b) => scoreTask(b) - scoreTask(a));
      setTasks(arr);
    });
    return () => unsub();
  }, []);

  return (
    <ul className="task-list">
      {tasks.map(t => (
        <li key={t.id} className="task-card">
          <h3>{t.title}</h3>
          <p>Due: {t.dueDate?.toDate().toLocaleDateString() || "—"}</p>
          <p>Imp: {t.importance} ★ | Est: {t.estimatedTime}m | {t.difficulty}</p>
        </li>
      ))}
    </ul>
  );
}
