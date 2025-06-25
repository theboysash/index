import { useState } from "react";
import { addTask } from "../taskService";
import { Timestamp } from "firebase/firestore";



export default function TaskForm() {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [importance, setImportance] = useState<1|2|3|4|5>(3);

  const [estTime, setEstTime] = useState(30);
  const [difficulty, setDifficulty] = useState<"Easy"|"Medium"|"Hard">("Medium");
  const [contentType, setContentType] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addTask({
      title,
      
      dueDate: dueDate ? Timestamp.fromDate(new Date(dueDate)) : undefined,
      importance,
      estimatedTime: estTime,
      difficulty,
      contentType: contentType.split(",").map(t => t.trim()),
      iterationCount: 0,
      lastIterationAt: Timestamp.now(),
    });
    // reset form
    setTitle("");
    setDueDate("");
    setImportance(3);
    setEstTime(30);
    setDifficulty("Medium");
    setContentType("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        placeholder="Task title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <input
        type="date"
        value={dueDate}
        onChange={e => setDueDate(e.target.value)}
      />
      <select
        value={importance}
        onChange={e => setImportance(Number(e.target.value) as 1|2|3|4|5)}
      >
        {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}★</option>)}
      </select>
      <select
        value={estTime}
        onChange={e => setEstTime(Number(e.target.value))}
      >
        {[15,30,45,60].map(m => <option key={m} value={m}>{m} min</option>)}
      </select>
      <select
        value={difficulty}
        onChange={e => setDifficulty(e.target.value as any)}
      >
        {["Easy","Medium","Hard"].map(d => <option key={d}>{d}</option>)}
      </select>
      <input
        placeholder="Tags (comma-sep)"
        value={contentType}
        onChange={e => setContentType(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}
