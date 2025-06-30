import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSubjects } from '../hooks/UseSubjects';

// Predefined faculties
const faculties = ['Computer Science', 'Math', 'Personal'];

export default function StudyPage() {
  const userId = 'test-user';
  const { subjects, create, update, remove } = useSubjects(userId);
  const [subjectName, setSubjectName] = useState('');
  const [faculty, setFaculty] = useState(faculties[0]);

  // Add a new subject
  const handleAddSubject = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = subjectName.trim();
    if (!trimmedName) return;
    await create({ userId, name: trimmedName, faculty });
    setSubjectName('');
    setFaculty(faculties[0]);
  };

  // Delete a subject by ID
  const handleDeleteSubject = async (id: string) => {
    await remove(id);
  };

  // Edit a subject's name and faculty
  const handleEditSubject = async (id: string, currentName: string, currentFaculty: string) => {
    const newName = window.prompt('Edit subject name', currentName);
    if (!newName || !newName.trim()) return;
    const newFaculty = window.prompt('Edit faculty', currentFaculty);
    if (!newFaculty) return;
    await update(id, { name: newName.trim(), faculty: newFaculty });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Study</h1>

      {/* Subject Cards with CRUD actions */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
        {subjects.map((subj, idx) => (
          <div key={subj.id} className="relative group">
            <Link
              to={`/study/${encodeURIComponent(subj.name)}`}
              className={`vertical-card gradient-${idx % 3}`}
            >
              <div className="card-header">
                <span className="card-icon">
                  {/* TODO: icon based on subj.faculty */}
                </span>
                <h3 className="card-title">{subj.name}</h3>
              </div>
              <div className="card-footer">{subj.faculty}</div>
            </Link>
            {/* Edit/Delete buttons appear on hover */}
            <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition">
              <button
                className="bg-white p-1 rounded shadow"
                onClick={() => handleEditSubject(subj.id, subj.name, subj.faculty)}
              >✏️</button>
              <button
                className="bg-white p-1 rounded shadow"
                onClick={() => handleDeleteSubject(subj.id)}
              >🗑️</button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Subject Form */}
      <form className="colorful-form" onSubmit={handleAddSubject}>
        <div className="form-group">
          <label className="form-label">Subject Name</label>
          <input
            className="form-input"
            value={subjectName}
            onChange={e => setSubjectName(e.target.value)}
            placeholder="Enter subject"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Faculty</label>
          <select
            className="form-input"
            value={faculty}
            onChange={e => setFaculty(e.target.value)}
          >
            {faculties.map(f => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="form-button">
          Add Subject
        </button>
      </form>
    </div>
  );
}
