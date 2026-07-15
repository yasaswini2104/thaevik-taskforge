import type { Request, Response } from "express";
import * as taskService from "../services/task.service.js";

export const getAllTasks = async (
  _req: Request,
  res: Response
): Promise<void> => {
  const tasks = await taskService.findAll();
  res.status(200).json(tasks);
};

