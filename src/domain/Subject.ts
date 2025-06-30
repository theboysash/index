// domain/Subject.ts
export interface Subject {
  id: string;           // Firestore doc ID or SQL primary key
  userId: string;       // if you’re scoping subjects per user
  name: string;         // e.g. “Linear Algebra”
  faculty: string;      // e.g. “Math”
  createdAt: Date;
  updatedAt: Date;
}
