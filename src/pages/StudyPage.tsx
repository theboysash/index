// File: src/pages/StudyPage.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useSubjects from '../hooks/useSubjects';
import useTests from '../hooks/useTests';
import type { Subject } from '../domain/Subject';
import type { Test } from '../domain/Test';
import '../styles/StudyPage.css';

export default function StudyPage() {
  const userId = 'test-user';
  const { subjects, create: createSubject } = useSubjects();
  const { tests, create: createTest } = useTests();

  const [name, setName] = useState('');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('');
  const [testDate, setTestDate] = useState('');
  const [testContent, setTestContent] = useState('');

  useEffect(() => {
    if (subjects.length && !selectedSubjectId) {
      setSelectedSubjectId(subjects[0].id);
    }
  }, [subjects, selectedSubjectId]);

  const handleAddSubject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    await createSubject({ userId, name: name.trim(), shortDescription: '' });
    setName('');
  };

  const handleAddTest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubjectId || !testDate) return;
    await createTest({ userId, subjectId: selectedSubjectId, date: testDate, content: testContent.trim() });
    setTestDate('');
    setTestContent('');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Study</h1>

      {/* Subjects grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {subjects.map((subj: Subject) => (
          <Link key={subj.id} to={`/study/${encodeURIComponent(subj.id)}`} className="vertical-card">
            <h3 className="card-title">{subj.name}</h3>
          </Link>
        ))}
      </div>

      {/* Add Subject Form */}
      <form onSubmit={handleAddSubject} className="colorful-form mb-6">
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

      {/* Tests Section */}
      <div className="tests-section mb-6">
        <h2 className="text-xl font-semibold mb-2">Tests</h2>
        <ul className="test-list mb-4">
          {tests.length ? (
            tests.map((t: Test) => {
              const subject = subjects.find(s => s.id === t.subjectId);
              const subjectName = subject ? subject.name : 'Unknown';
              return (
                <li key={t.id} className="test-item">
                  <strong>{subjectName}</strong> — {new Date(t.date).toLocaleDateString()}
                  {t.content && <><br />{t.content}</>}
                </li>
              );
            })
          ) : (
            <li>No tests added yet.</li>
          )}
        </ul>

        <h3 className="text-lg font-semibold mb-2">Add Test</h3>
        <form onSubmit={handleAddTest} className="colorful-form">
          <select
            className="form-input mb-2"
            value={selectedSubjectId}
            onChange={(e) => setSelectedSubjectId(e.target.value)}
            required
          >
            {subjects.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
          <input
            type="date"
            className="form-input mb-2"
            value={testDate}
            onChange={(e) => setTestDate(e.target.value)}
            required
          />
          <textarea
            className="form-input mb-2"
            placeholder="Topics covered (optional)"
            value={testContent}
            onChange={(e) => setTestContent(e.target.value)}
          />
          <button type="submit" className="form-button">
            Add Test
          </button>
        </form>
      </div>
    </div>
  );
}