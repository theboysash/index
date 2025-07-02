import {
  collection,
  query,
  

  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase';

export default function useCollection<T>(
  path: string,
  constraints: any[] = []
) {
  const [items, setItems] = useState<T[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, path),
      ...constraints,
      
    );
    return onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as any),
      }));
      setItems(data);
    });
  }, [path, JSON.stringify(constraints)]);

  const add = (data: Omit<T, 'id'>) => addDoc(collection(db, path), data);
  const update = (id: string, data: Partial<T>) =>
    updateDoc(doc(db, path, id), data);
  const remove = (id: string) => deleteDoc(doc(db, path, id));

  return { items, add, update, remove };
}