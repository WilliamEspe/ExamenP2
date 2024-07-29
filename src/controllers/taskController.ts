// src/controllers/taskController.ts
import { db } from '../lib/firebaseConfig';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { Task } from '../models/Task';

const tasksCollection = collection(db, 'tasks');

export const getTasks = async () => {
  const snapshot = await getDocs(tasksCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const createTask = async (task: Task) => {
  const docRef = await addDoc(tasksCollection, { title: task.title, description: task.description, completed: task.completed });
  return docRef.id;
};

export const updateTask = async (id: string, updatedTask: Partial<Task>) => {
  const taskDoc = doc(db, 'tasks', id);
  await updateDoc(taskDoc, updatedTask);
};

export const deleteTask = async (id: string) => {
  const taskDoc = doc(db, 'tasks', id);
  await deleteDoc(taskDoc);
};
