// src/HomePage.tsx
import { Link } from "react-router-dom";
import "./HomePage.css";

// Dummy top-3 tasks
const topTasks = [
  { id: "1", icon: "📝", title: "Write essay draft", due: "Due in 2d" },
  { id: "2", icon: "📘", title: "Study Chapter 4", due: "Due in 1d" },
  { id: "3", icon: "🦷", title: "Floss & brush", due: "Daily" },
];

// Category definitions
const categories = [
  { id: "once-off", label: "Once-off", icon: "📌", back: "Create one-off tasks here" },
  { id: "study",    label: "Study",    icon: "📚", back: "Track your study sessions" },
  { id: "habit",    label: "Habit",    icon: "🔄", back: "Daily habit tracker" },
  { id: "chore",    label: "Chore",    icon: "🧹", back: "Household chores" },
];

export default function HomePage() {
  return (
    <div className="p-6 space-y-12">
      {/* Top 3 Priority Tasks */}
      <h2 className="text-2xl font-bold">Top 3 Priorities</h2>
      <div className="task-cards">
        {topTasks.map((task, idx) => (
          <div key={task.id} className={`vertical-card gradient-${idx % 3}`}>
            <div className="card-header">
              <span className="card-icon">{task.icon}</span>
              <h3 className="card-title">{task.title}</h3>
            </div>
            <div className="card-footer">{task.due}</div>
          </div>
        ))}
      </div>

      {/* Category flip-cards */}
      <h2 className="text-2xl font-bold">Categories</h2>
      <div className="category-flip-cards">
        {categories.map((cat) => (
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
    </div>
  )
}
