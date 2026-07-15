import type { Request, Response } from "express";
import * as taskService from "../services/task.service.js";

export const getAllTasks = async (
  _req: Request,
  res: Response
): Promise<void> => {
  const tasks = await taskService.findAll();
  res.status(200).json(tasks);
};

export const getTaskById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = Number(req.params.id);

  const task = await taskService.findById(id);

  if (!task) {
    res.status(404).json({
      message: "Task not found",
    });
    return;
  }

  res.status(200).json(task);
};

export const createTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title, description, status } = req.body;

  const task = await taskService.create({
    title,
    description,
    status,
  });

  res.status(201).json(task);
};

export const updateTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = Number(req.params.id);

  const { title, description, status } = req.body;

  const existingTask = await taskService.findById(id);

  if (!existingTask) {
    res.status(404).json({
      message: "Task not found",
    });
    return;
  }

  const updatedTask = await taskService.update(id, {
    title,
    description,
    status,
  });

  res.status(200).json(updatedTask);
};

export const deleteTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = Number(req.params.id);

  const existingTask = await taskService.findById(id);

  if (!existingTask) {
    res.status(404).json({
      message: "Task not found",
    });
    return;
  }

  await taskService.remove(id);

  res.status(200).json({
    message: "Task deleted successfully",
  });
};