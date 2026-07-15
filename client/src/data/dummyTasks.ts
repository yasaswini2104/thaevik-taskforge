import type { Task } from '../types/task';
import { TaskStatus } from '../types/task';

// Note: Using crypto.randomUUID() isn't safe at module top-level if run in older environments,
// but since this is Vite + modern browser, it's fine. For stability, we can just use static IDs
// for the initial dummy data, and randomUUID for newly created tasks.
export const dummyTasks: Task[] = [
  {
    id: 'f1c504a2-1d54-4f24-8b65-6743b17c8052',
    title: 'Design Design System',
    description: 'Create a modern SaaS-inspired design system focusing on clean aesthetics, soft shadows, and typography.',
    status: TaskStatus.COMPLETED,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'e6a8e833-28c0-4354-9549-d00e5720dcd1',
    title: 'Implement Task List UI',
    description: 'Build the React components for displaying task cards with their respective statuses.',
    status: TaskStatus.IN_PROGRESS,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '6b4a20b7-9d41-4cf4-91c2-bd17c8449c24',
    title: 'Add Form Validation',
    description: 'Ensure title is required and cannot be submitted empty. Add visual error indicators.',
    status: TaskStatus.PENDING,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '7d390a1e-a4b5-4160-b8d4-51dc5d8869c9',
    title: 'Integrate Routing',
    description: 'Setup react-router-dom for potential multi-page scaling (e.g., /task/:id details).',
    status: TaskStatus.PENDING,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'b8e9b62f-73ad-4e31-8e77-986c52a0a54e',
    title: 'Dark Theme Optimization',
    description: 'Refine the charcoal background, glowing gradients, and glassmorphism panels for a premium feel.',
    status: TaskStatus.IN_PROGRESS,
    createdAt: new Date().toISOString(),
  }
];
