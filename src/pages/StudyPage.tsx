import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useSubjects from '../hooks/useSubjects'; // ✅ ensure file is named exactly like this
import type { Subject } from '../domain/Subject';
import './StudyPage.css';


export default function StudyPage() {
  const userId = 'test-user';
  const { subjects, create } = useSubjects(); // ✅ no filter on userId in the hook
  const [name, setName] = useState('');

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    // ✅ include userId when creating the subject
    await create({
  userId,
  name: name.trim(),
  shortDescription: '',
});

    setName('');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Study</h1>

      {/* Subjects grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {subjects.map((subj: Subject) => (
          <Link
            key={subj.id}
            to={`/study/${encodeURIComponent(subj.id)}`}
            className="vertical-card"
          >
            <h3 className="card-title">{subj.name}</h3>
          </Link>
        ))}
      </div>

      {/* Add Subject Form */}
      <form onSubmit={handleAdd} className="colorful-form">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New subject"
          className="form-input"
        />
        <button type="submit" className="form-button">
          Add Subject
        </button>
      </form>
    </div>
  );
}
