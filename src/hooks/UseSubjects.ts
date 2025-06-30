// hooks/useSubjects.ts
import { useEffect, useState, useCallback } from 'react'
import { FirestoreSubjectRepo } from '../services/FirestoreSubjectRepo'
import type { Subject } from '../domain/Subject'

const repo = new FirestoreSubjectRepo()

export function useSubjects(userId: string) {
  const [subjects, setSubjects] = useState<Subject[]>([])

  useEffect(() => {
    const unsub = repo.onList(userId, setSubjects)
    return () => unsub()
  }, [userId])

  const create = useCallback((data: Omit<Subject,'id'|'createdAt'|'updatedAt'>) =>
    repo.create(data), [])

  const update = useCallback((id: string, patch: Partial<Subject>) =>
    repo.update(id, patch), [])

  const remove = useCallback((id: string) => repo.delete(id), [])

  return { subjects, create, update, remove }
}
