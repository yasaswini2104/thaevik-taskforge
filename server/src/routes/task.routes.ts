import { Router } from "express";
import {
  getAllTasks, 
  getTaskById,
  createTask,
  updateTask
} from "../controllers/task.controller.js";

const router = Router();

router.get("/", getAllTasks);
router.get("/:id", getTaskById);
router.post("/", createTask);
router.put("/:id", updateTask);

export default router;