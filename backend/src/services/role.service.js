import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getRolesService = async () => {
  try {
    const roles = await prisma.Role.findMany();
    return roles;
  } catch (error) {
    throw new Error(`Error al obtener los roles: ${error.message}`);
  }
};
