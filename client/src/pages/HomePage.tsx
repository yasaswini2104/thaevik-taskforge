import { useEffect, useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { TaskList } from '../components/TaskList/TaskList';
import { EmptyState } from '../components/EmptyState/EmptyState';
import { TaskForm } from '../components/TaskForm/TaskForm';
import { DeleteDialog } from '../components/DeleteDialog/DeleteDialog';
import { AboutSection } from '../components/AboutSection/AboutSection';
import type { Task } from '../types/task';
import { TaskStatus } from '../types/task';
// import { dummyTasks } from '../data/dummyTasks';
import * as taskService from '../services/task.service';
import './HomePage.css';

export function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  // Stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === TaskStatus.COMPLETED).length;

  const loadTasks = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await taskService.getTasks();
      setTasks(data);
    } catch {
      setError('Unable to load tasks. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleOpenCreateForm = () => {
    setTaskToEdit(null);
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (task: Task) => {
    setTaskToEdit(task);
    setIsFormOpen(true);
  };

  const handleOpenDeleteDialog = (task: Task) => {
    setTaskToDelete(task);
    setIsDeleteDialogOpen(true);
  };

  const handleSaveTask = async (taskData: Partial<Task>) => {
    try {
      if (taskToEdit) {
        const updated = await taskService.updateTask(taskToEdit.id, {
          title: taskData.title ?? taskToEdit.title,
          description: taskData.description ?? taskToEdit.description,
          status: taskData.status ?? taskToEdit.status,
        });
        setTasks(prev => prev.map(t => (t.id === updated.id ? updated : t)));
      } else {
        const created = await taskService.createTask({
          title: taskData.title || '',
          description: taskData.description || '',
          status: taskData.status || TaskStatus.PENDING,
        });
        setTasks(prev => [created, ...prev]);
      }
    } catch {
      setError('Unable to save task. Please try again.');
    }
  };

  const handleDeleteTask = async () => {
    if (!taskToDelete) return;
    try {
      await taskService.deleteTask(taskToDelete.id);
      setTasks(prev => prev.filter(t => t.id !== taskToDelete.id));
    } catch {
      setError('Unable to delete task. Please try again.');
    }
  };

  return (
    <MainLayout onAddTask={handleOpenCreateForm}>
      <div className="home-header">
        <div>
          <h2 className="page-title">Tasks</h2>
          <p className="page-subtitle">Manage your daily tasks and productivity.</p>
        </div>
        <div className="task-stats">
          <div className="stat-badge">
            <span className="stat-label">Total</span>
            <span className="stat-value">{totalTasks}</span>
          </div>
          <div className="stat-badge">
            <span className="stat-label">Completed</span>
            <span className="stat-value">{completedTasks}</span>
          </div>
        </div>
      </div>

      <div className="home-content">
        {isLoading ? (
          <div className="state-message">
            <p>Loading tasks...</p>
          </div>
        ) : error ? (
          <div className="state-message">
            <p>{error}</p>
            <button className="btn-primary" onClick={loadTasks}>Retry</button>
          </div>
        ) : tasks.length > 0 ? (
          <TaskList
            tasks={tasks}
            onEdit={handleOpenEditForm}
            onDelete={handleOpenDeleteDialog}
          />
        ) : (
          <EmptyState onAddTask={handleOpenCreateForm} />
        )}
      </div>

      <AboutSection />

      <TaskForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        onSave={handleSaveTask}
        initialData={taskToEdit}
      />

      <DeleteDialog 
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteTask}
      />
    </MainLayout>
  );
}
