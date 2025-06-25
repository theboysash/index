import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import type { DocumentReference, DocumentData } from "firebase/firestore";

import type { Task } from "./types"; // move Task to types.ts

// 1. Export the collection so TaskList can use it
export const tasksCol = collection(db, "tasks");

// 2. Allow TaskForm to add new tasks
export async function addTask(task: Omit<Task, "id">): Promise<DocumentReference<DocumentData>> {
  const docRef = await addDoc(tasksCol, {
    ...task,
    createdAt: Timestamp.now(), // optional field if you want
  });
  return docRef;
}

// 3. Optional: Keep sample and fetch functions for testing
export async function addSampleTask() {
  const newTask: Omit<Task, "id"> = {
    title: "Test Task",
    importance: 4,
    dueDate: Timestamp.fromDate(new Date(Date.now() + 3 * 86400000)), // 3 days
    estimatedTime: 30,
    difficulty: "Medium",
    contentType: ["proof"],
    iterationCount: 0,
    lastIterationAt: Timestamp.fromDate(new Date()),
  };

  const docRef = await addTask(newTask);
  console.log("Sample Task added with ID:", docRef.id);
}

export async function fetchTasks() {
  const snapshot = await getDocs(tasksCol);
  const tasks = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  console.log("Fetched tasks:", tasks);
  return tasks;
}
