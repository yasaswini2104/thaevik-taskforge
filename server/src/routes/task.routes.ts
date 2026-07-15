import { Router } from "express";
import { validate } from "../middleware/validate.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";
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

router.get("/", asyncHandler(getAllTasks));
router.get("/:id", asyncHandler(getTaskById));
router.post("/", validate(createTaskSchema), asyncHandler(createTask));
router.put("/:id", validate(updateTaskSchema), asyncHandler(updateTask));
router.delete("/:id", asyncHandler(deleteTask));

export default router;