import prisma from "../config/prisma.js";

export const findAll = async () => {
  return await prisma.task.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};
