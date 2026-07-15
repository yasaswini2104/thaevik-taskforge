import { Router } from "express";
import { validate } from "../middleware/validate.middleware.js";
import {
  getAllTasks, 
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} from "../controllers/task.controller.js";
import {
  createTaskSchema,
  updateTaskSchema,
} from "../validators/task.validator.js";

const router = Router();

router.get("/", getAllTasks);
router.get("/:id", getTaskById);
router.post("/", validate(createTaskSchema), createTask);
router.put("/:id", validate(updateTaskSchema), updateTask);
router.delete("/:id", deleteTask);

export default router;