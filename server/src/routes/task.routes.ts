import { Router } from "express";
import {
  getAllTasks, 
  getTaskById,
  createTask
} from "../controllers/task.controller.js";

const router = Router();

router.get("/", getAllTasks);
router.get("/:id", getTaskById);
router.post("/", createTask);

export default router;