"use client";
import React, { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/taskController';
import { Task } from '../models/Task';
import AuthWrapper from '../components/AuthWrapper';
import useFirebaseAuth from '../hooks/useFirebaseAuth';

const HomePage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { user, logout } = useFirebaseAuth();

  useEffect(() => {
    async function fetchTasks() {
      const taskData = await getTasks();
      const formattedTasks: Task[] = taskData.map((task: any) => ({
        id: task.id,
        title: task.title,
        description: task.description,
        completed: task.completed || false,
        inProgress: task.inProgress || false
      }));
      setTasks(formattedTasks);
    }
    fetchTasks();
  }, []);

  const handleCreateTask = async (title: string, description: string) => {
    const id = await createTask(new Task('', title, description, false, false));
    setTasks([...tasks, new Task(id, title, description, false, false)]);
  };

  const handleUpdateTask = async (id: string, updatedTask: Partial<Task>) => {
    await updateTask(id, updatedTask);
    setTasks(tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task)));
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleStartTask = async (id: string) => {
    await updateTask(id, { inProgress: true });
    setTasks(tasks.map((task) => (task.id === id ? { ...task, inProgress: true } : task)));
  };

  const handleCompleteTask = async (id: string) => {
    await updateTask(id, { completed: true, inProgress: false });
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: true, inProgress: false } : task)));
  };

  return (
    <AuthWrapper>
      <div className="container">
        <header className="header">
          <h1>Administrador de Tareas</h1>
          {user && <button className="logout-button" onClick={logout}>Cerrar Sesión</button>}
        </header>
        <TaskForm onCreateTask={handleCreateTask} />
        <TaskList
          tasks={tasks}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
          onStartTask={handleStartTask}
          onCompleteTask={handleCompleteTask}
        />
      </div>
    </AuthWrapper>
  );
};

export default HomePage;
