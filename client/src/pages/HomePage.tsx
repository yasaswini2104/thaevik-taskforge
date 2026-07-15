import { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { TaskList } from '../components/TaskList/TaskList';
import { EmptyState } from '../components/EmptyState/EmptyState';
import { TaskForm } from '../components/TaskForm/TaskForm';
import { DeleteDialog } from '../components/DeleteDialog/DeleteDialog';
import { AboutSection } from '../components/AboutSection/AboutSection';
import type { Task } from '../types/task';
import { TaskStatus } from '../types/task';
import { dummyTasks } from '../data/dummyTasks';
import './HomePage.css';

export function HomePage() {
  const [tasks, setTasks] = useState<Task[]>(dummyTasks);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  // Stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === TaskStatus.COMPLETED).length;

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

  const handleSaveTask = (taskData: Partial<Task>) => {
    if (taskToEdit) {
      // Update existing task
      setTasks(prevTasks => prevTasks.map(t => 
        t.id === taskToEdit.id ? { ...t, ...taskData } as Task : t
      ));
    } else {
      // Create new task
      const newTask: Task = {
        id: crypto.randomUUID(),
        title: taskData.title || '',
        description: taskData.description || '',
        status: taskData.status || TaskStatus.PENDING,
        createdAt: new Date().toISOString(),
      };
      setTasks(prevTasks => [newTask, ...prevTasks]);
    }
  };

  const handleDeleteTask = () => {
    if (taskToDelete) {
      setTasks(prevTasks => prevTasks.filter(t => t.id !== taskToDelete.id));
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
        {tasks.length > 0 ? (
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
