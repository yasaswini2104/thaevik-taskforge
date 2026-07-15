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

  if (!title || title.trim() === "") {
    res.status(400).json({
      message: "Title is required",
    });
    return;
  }

  const task = await taskService.create({
    title,
    description,
    status,
  });

  res.status(201).json(task);
};