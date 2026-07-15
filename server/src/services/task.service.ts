import prisma from "../config/prisma.js";
import type { CreateTaskDto } from "../types/task.types.js";

export const findAll = async () => {
  return await prisma.task.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const findById = async (id: number) => {
  return prisma.task.findUnique({
    where: {
      id,
    },
  });
};

export const create = async (data: CreateTaskDto) => {
  return await prisma.task.create({
    data,
  });
};