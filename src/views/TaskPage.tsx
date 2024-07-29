// src/views/TaskPage.tsx
import React, { useEffect, useState } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/taskController';
import { Task } from '../models/Task';
import TaskList from '../components/TaskList';

const TaskPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<{ title: string; description: string }>({ title: '', description: '' });

  useEffect(() => {
    async function fetchTasks() {
      const taskData = await getTasks();
      const formattedTasks: Task[] = taskData.map((task: any) => ({
        id: task.id,
        title: task.title,
        description: task.description,
        completed: task.completed,
      }));
      setTasks(formattedTasks);
    }
    fetchTasks();
  }, []);

  const handleCreateTask = async () => {
    const id = await createTask(new Task('', newTask.title, newTask.description));
    setTasks([...tasks, new Task(id, newTask.title, newTask.description)]);
    setNewTask({ title: '', description: '' });
  };

  const handleUpdateTask = async (id: string, updatedTask: Partial<Task>) => {
    await updateTask(id, updatedTask);
    setTasks(tasks.map(task => (task.id === id ? { ...task, ...updatedTask } : task)));
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id);
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleCompleteTask = async (id: string) => {
    await updateTask(id, { completed: true });
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div>
      <h1>Tasks</h1>
      <input
        type="text"
        placeholder="Title"
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
      />
      <textarea
        placeholder="Description"
        value={newTask.description}
        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
      />
      <button onClick={handleCreateTask}>Add Task</button>
      <TaskList tasks={tasks} onUpdateTask={handleUpdateTask} onDeleteTask={handleDeleteTask} onCompleteTask={handleCompleteTask} />
    </div>
  );
};

export default TaskPage;
