import { z } from "zod";

export const createTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(100, "Title cannot exceed 100 characters"),

  description: z
    .string()
    .max(500, "Description cannot exceed 500 characters")
    .optional(),

  status: z
    .enum(["PENDING", "IN_PROGRESS", "COMPLETED"])
    .default("PENDING"),
});

export const updateTaskSchema = createTaskSchema.partial();