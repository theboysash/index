// src/services/FirestoreTaskRepo.ts
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  Timestamp
} from 'firebase/firestore';
import { db } from '../firebase';
import type { TaskRepository } from './TaskRepository';

function toFirestore(obj: any): any {
  if (obj instanceof Date) return Timestamp.fromDate(obj);
  if (Array.isArray(obj)) return obj.map(v => toFirestore(v));
  if (obj && typeof obj === 'object') {
    const out: any = {};
    for (const key in obj) out[key] = toFirestore(obj[key]);
    return out;
  }
  return obj;
}

function fromFirestore<T>(snap: any): T & { id: string } {
  const data = snap.data();
  function walk(o: any): any {
    if (o instanceof Timestamp) return o.toDate();
    if (Array.isArray(o)) return o.map(walk);
    if (o && typeof o === 'object') {
      const out: any = {};
      for (const k in o) out[k] = walk(o[k]);
      return out;
    }
    return o;
  }
  const plain = walk(data);
  return { id: snap.id, ...plain };
}

export class FirestoreTaskRepo implements TaskRepository {
  private col = collection(db, 'tasks');

  async create<T>(data: any): Promise<string> {
    const now = new Date();
    const payload = toFirestore({ ...data, createdAt: now, updatedAt: now });
    const ref = await addDoc(this.col, payload);
    return ref.id;
  }

  onList<T>(category: string, callback: any): () => void {
    const q = query(this.col, where('category', '==', category));
    const unsub = onSnapshot(q, snap => {
      const items = snap.docs.map(doc => fromFirestore<T>(doc));
      callback(items);
    });
    return unsub;
  }

  async update<T>(id: string, data: any): Promise<void> {
    const ref = doc(this.col, id);
    await updateDoc(ref, toFirestore({ ...data, updatedAt: new Date() }));
  }

  async delete(id: string): Promise<void> {
    const ref = doc(this.col, id);
    await deleteDoc(ref);
  }
}
