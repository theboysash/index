// src/taskService.ts
import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  Timestamp,
  type DocumentReference,
  type DocumentData
} from "firebase/firestore";
import type { Task } from "./types";

export const tasksCol = collection(db, "tasks");

export async function addTask(task: Omit<Task, "id">): Promise<DocumentReference<DocumentData>> {
  const docRef = await addDoc(tasksCol, {
    ...task,
    createdAt: Timestamp.now(), // optional
  });
  return docRef;
}


/** NEW: update any fields on a task */
export async function updateTask(id: string, updates: Partial<Omit<Task,"id">>) {
  const ref = doc(tasksCol, id);
  await updateDoc(ref, updates);
}

/** NEW: permanently delete a task */
export async function deleteTask(id: string) {
  const ref = doc(tasksCol, id);
  await deleteDoc(ref);
}

// (existing sample/fetch functions…)
