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