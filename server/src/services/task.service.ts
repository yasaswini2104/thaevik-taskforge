import prisma from "../config/prisma.js";

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