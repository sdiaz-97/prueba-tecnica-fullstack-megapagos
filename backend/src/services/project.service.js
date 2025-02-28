import { PrismaClient } from "@prisma/client";
import { format, subHours } from "date-fns";

const prisma = new PrismaClient();

export const getProjectsService = async ({ page = 1, limit = 10, search = "", userId, isAdmin }) => {
  try {
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);
    const skip = (pageNumber - 1) * pageSize;

    let whereCondition = {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ],
    };

    if (!isAdmin) {
      whereCondition = {
        ...whereCondition,
        assignedUsers: {
          some: { userId },
        },
      };
    }

    const projects = await prisma.project.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        admin: { select: { id: true, name: true, email: true } },
        ...(isAdmin
          ? {
              assignedUsers: {
                select: {
                  user: { select: { id: true, name: true, email: true } },
                },
              },
            }
          : {}),
      },
      where: whereCondition,
      skip,
      take: pageSize,
    });

    const formattedProjects = projects.map((project) => ({
      ...project,
      createdAt: format(subHours(new Date(project.createdAt), 5), "yyyy-MM-dd HH:mm"),
    }));

    const totalProjects = await prisma.project.count({ where: whereCondition });

    return {
      total: totalProjects,
      page: pageNumber,
      limit: pageSize,
      projects: formattedProjects,
    };
  } catch (error) {
    throw new Error(`Error al obtener los proyectos: ${error.message}`);
  }
};


export const postProjectService = async ({ name, description, userId, assignedUsers }) => {
  try {
    let response = {};

    const newProject = await prisma.project.create({
      data: {
        name,
        description,
        admin: {
          connect: { id: userId },
        },
        assignedUsers: {
          create: assignedUsers.map((userId) => ({
            user: { connect: { id: userId } },
          })),
        },
      },
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        admin: { select: { id: true, name: true, email: true } },
        assignedUsers: {
          select: {
            user: { select: { id: true, name: true, email: true } },
          },
        },
      },
    });

    response.status = 201;
    response.message = "Proyecto creado correctamente";
    response.data = newProject;
    return response;
  } catch (error) {
    throw new Error(`Error al crear el proyecto: ${error.message}`);
  }
};


export const updateProjectService = async ({ id, name, description, administradorId, assignedUsers }) => {
  try {
    const projectId = parseInt(id, 10);
    const updateData = {};

    if (name) {
      updateData.name = name;
    }
    if (description) {
      updateData.description = description;
    }
    if (administradorId) {
      updateData.admin = { connect: { id: administradorId } };
    }

    if (Array.isArray(assignedUsers)) {
      updateData.assignedUsers = {
        deleteMany: {}, 
        create: assignedUsers.map(userId => ({ userId })),
      };
    }

    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: updateData,
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        admin: { select: { id: true, name: true, email: true } },
        assignedUsers: {
          select: {
            user: { select: { id: true, name: true, email: true } }, 
          },
        },
      },
    });

    return {
      status: 200,
      message: "Proyecto actualizado correctamente.",
      data: {
        ...updatedProject,
        assignedUsers: updatedProject.assignedUsers.map(item => item.user), 
      },
    };
  } catch (error) {
    throw new Error(`Error al actualizar el proyecto: ${error.message}`);
  }
};

export const deleteProjectService = async (id) => {
  try {
    let response = {};
    const projectId = parseInt(id, 10);

    await prisma.userProject.deleteMany({
      where: { projectId },
    });

    await prisma.project.delete({
      where: { id: projectId },
    });

    response.status = 200;
    response.message = "Proyecto eliminado correctamente";
    return response;
  } catch (error) {
    throw new Error(`Error al eliminar el proyecto: ${error.message}`);
  }
};
