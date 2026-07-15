import api from './api';
import type { Task, TaskStatus } from '../types/task';

export interface TaskPayload {
  title: string;
  description: string;
  status: TaskStatus;
}

export async function getTasks(): Promise<Task[]> {
  const response = await api.get<Task[]>('/tasks');
  return response.data;
}

export async function getTaskById(id: number): Promise<Task> {
  const response = await api.get<Task>(`/tasks/${id}`);
  return response.data;
}

export async function createTask(task: TaskPayload): Promise<Task> {
  const response = await api.post<Task>('/tasks', task);
  return response.data;
}

export async function updateTask(id: number, task: TaskPayload): Promise<Task> {
  const response = await api.put<Task>(`/tasks/${id}`, task);
  return response.data;
}

export async function deleteTask(id: number): Promise<void> {
  await api.delete(`/tasks/${id}`);
}