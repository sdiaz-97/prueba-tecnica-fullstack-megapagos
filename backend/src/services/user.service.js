import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const saltRounds = 10;

const prisma = new PrismaClient();

export const getUsersService = async ({
  page = 1,
  limit = 10,
  search = "",
}) => {
  try {
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);
    const skip = (pageNumber - 1) * pageSize;

    const whereCondition = {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ],
    };

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: { select: { id: true, name: true } },
        administrador: { select: { id: true, name: true } },
      },
      where: whereCondition,
      skip,
      take: pageSize,
    });

    const totalUsers = await prisma.user.count({ where: whereCondition });

    return {
      total: totalUsers,
      page: pageNumber,
      limit: pageSize,
      users,
    };
  } catch (error) {
    throw new Error(`Error al obtener los usuarios: ${error.message}`);
  }
};

export const postUserService = async ({
  name,
  email,
  password,
  roleId,
  administradorId,
}) => {

  try {
    let response = {};
    const userExist = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!userExist) {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const userData = {
        name,
        email,
        password: hashedPassword,
        role: { connect: { name: roleId } },
      };

      if (administradorId) {
        userData.administrador = { connect: { id: administradorId } };
      }

      const newUser = await prisma.user.create({
        data: userData,
        select: {
          id: true,
          name: true,
          email: true,
          role: { select: { id: true, name: true } },
          administrador: { select: { id: true, name: true, email: true } },
        },
      });
      response.status = 201;
      response.message = "Usuario Creado!";
      response.data = { userId: newUser.id }
    } else {
      response.status = 200;
      response.message = "Ya existe un usuario con ese correo";
    }

    return response;

  } catch (error) {
    throw new Error(`Error al crear el usuario: ${error.message}`);
  }
};

export const updateUserService = async ({
  id,
  name,
  email,
  password,
  roleId,
  administradorId,
}) => {
  try {
    const userId = parseInt(id);
    const updateData = {};
    if (name) {
      updateData.name = name;
    }
    if (email) {
      updateData.email = email;
    }
    if (roleId) {
      updateData.role = {
        connect: { name: roleId },
      };
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      updateData.password = hashedPassword;
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: { select: { id: true, name: true } },
        administrador: { select: { id: true, name: true, email: true } },
        administradorId: administradorId
      },
    });

    return {
      status: 200,
      message: "Usuario actualizado correctamente.",
      data: updatedUser,
    };
  } catch (error) {
    throw new Error(`Error en updateUserService: ${error.message}`);
  }
};

export const deleteUserService = async (id) => {
  try {
    let response = {};
    const userExists = await prisma.user.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (userExists && userExists.email !== "admin@hotmail.com") {
      await prisma.userProject.deleteMany({
        where: { userId: userExists.id },
      });

      await prisma.user.delete({
        where: { id: userExists.id },
      });

      response.status = 200;
      response.message = "Usuario eliminado correctamente";
      return response;
    } else {
      response.status = 401;
      response.message = "No se puede eliminar el usuario";
      return response;
    }
  } catch (error) {
    throw new Error(`Error al eliminar el usuario: ${error.message}`);
  }
};


