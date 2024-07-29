import React, { useState } from 'react';
import { Task } from '../models/Task';

interface TaskListProps {
  tasks: Task[];
  onUpdateTask: (id: string, updatedTask: Partial<Task>) => void;
  onDeleteTask: (id: string) => void;
  onStartTask: (id: string) => void;
  onCompleteTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks, onUpdateTask, onDeleteTask, onStartTask, onCompleteTask
}) => {
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Partial<Task>>({});

  const handleEditClick = (task: Task) => {
    setEditingTaskId(task.id);
    setEditingTask(task);
  };

  const handleSaveClick = () => {
    if (editingTaskId) {
      onUpdateTask(editingTaskId, editingTask);
      setEditingTaskId(null);
      setEditingTask({});
    }
  };

  const renderTask = (task: Task, buttons: JSX.Element[]) => (
    <li key={task.id} className={`task-item ${task.completed ? 'completed' : task.inProgress ? 'in-progress' : ''}`}>
      {editingTaskId === task.id ? (
        <div>
          <input
            type="text"
            value={editingTask.title || ''}
            onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
          />
          <textarea
            value={editingTask.description || ''}
            onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
          />
          <button onClick={handleSaveClick}>Guardar</button>
          <button onClick={() => { setEditingTaskId(null); setEditingTask({}); }}>Cancelar</button>
        </div>
      ) : (
        <div>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          {buttons}
        </div>
      )}
    </li>
  );

  const newTasks = tasks.filter(task => !task.inProgress && !task.completed);
  const inProgressTasks = tasks.filter(task => task.inProgress && !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="task-columns">
      <div className="task-column">
        <h2>Nuevas Tareas</h2>
        <ul>
          {newTasks.map(task => renderTask(task, [
            <button key="edit" onClick={() => handleEditClick(task)}>Editar</button>,
            <button key="start" onClick={() => onStartTask(task.id)}>Realizar Tarea</button>,
            <button key="delete" onClick={() => onDeleteTask(task.id)}>Eliminar</button>
          ]))}
        </ul>
      </div>
      <div className="task-column">
        <h2>Tareas en Proceso</h2>
        <ul>
          {inProgressTasks.map(task => renderTask(task, [
            <button key="complete" onClick={() => onCompleteTask(task.id)}>Completar Tarea</button>,
            <button key="delete" onClick={() => onDeleteTask(task.id)}>Eliminar</button>
          ]))}
        </ul>
      </div>
      <div className="task-column">
        <h2>Tareas Completas</h2>
        <ul>
          {completedTasks.map(task => renderTask(task, [
            <button key="delete" onClick={() => onDeleteTask(task.id)}>Eliminar Tarea</button>
          ]))}
        </ul>
      </div>
    </div>
  );
};

export default TaskList;
