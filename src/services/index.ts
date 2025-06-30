import { FirestoreTaskRepo } from './FirestoreTaskRepo';
// import { InMemoryRepo } from './InMemoryRepo'; // for testing
export const taskRepo = new FirestoreTaskRepo();
