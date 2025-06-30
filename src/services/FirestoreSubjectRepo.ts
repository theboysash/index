// src/services/FirestoreSubjectRepo.ts
import {
  collection, addDoc, onSnapshot, updateDoc,
  deleteDoc, doc, query, where, Timestamp
} from 'firebase/firestore';
import { db } from '../firebase';
import type { SubjectRepository } from './SubjectRepository';
import type { Subject } from '../domain/Subject';

function toFirestore(obj: any): any {
  if (obj instanceof Date) return Timestamp.fromDate(obj);
  if (Array.isArray(obj)) return obj.map(toFirestore);
  if (obj && typeof obj === 'object') {
    return Object.fromEntries(Object.entries(obj).map(([k,v]) => [k, toFirestore(v)]));
  }
  return obj;
}

function fromFirestore<T>(snap: any): T & { id: string } {
  const data = snap.data();
  const walk = (v: any): any =>
    v instanceof Timestamp
      ? v.toDate()
      : Array.isArray(v)
        ? v.map(walk)
        : v && typeof v === 'object'
          ? Object.fromEntries(Object.entries(v).map(([k,u]) => [k, walk(u)]))
          : v;
  const plain = Object.fromEntries(Object.entries(data).map(([k,v]) => [k, walk(v)]));
  return { id: snap.id, ...(plain as object) } as any;
}

export class FirestoreSubjectRepo implements SubjectRepository {
  private col = collection(db, 'subjects');

  async create(data: any) {
    const now = new Date();
    const payload = toFirestore({ ...data, createdAt: now, updatedAt: now });
    const ref = await addDoc(this.col, payload);
    return ref.id;
  }

  onList(userId: string, callback: any) {
    const q = query(this.col, where('userId', '==', userId));
    const unsub = onSnapshot(q, snap => {
      const items = snap.docs.map(doc => fromFirestore<Subject>(doc));
      callback(items);
    });
    return unsub;
  }

  async update(id: string, data: any) {
    const ref = doc(this.col, id);
    await updateDoc(ref, toFirestore({ ...data, updatedAt: new Date() }));
  }

  async delete(id: string) {
    await deleteDoc(doc(this.col, id));
  }
}
