import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProjectsService = async ({ page = 1, limit = 10, search = "" }) => {
  try {
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);
    const skip = (pageNumber - 1) * pageSize;

    const whereCondition = {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ],
    };

    const projects = await prisma.project.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        // Información del administrador (propietario del proyecto)
        admin: { select: { id: true, name: true, email: true } },
        // Información de los usuarios asignados
        assignedUsers: {
          select: {
            user: { select: { id: true, name: true, email: true } },
          },
        },
      },
      where: whereCondition,
      skip,
      take: pageSize,
    });

    const totalProjects = await prisma.project.count({ where: whereCondition });

    return {
      total: totalProjects,
      page: pageNumber,
      limit: pageSize,
      projects,
    };
  } catch (error) {
    throw new Error(`Error al obtener los proyectos: ${error.message}`);
  }
};

export const postProjectService = async ({ name, description, administradorId }) => {
  try {
    let response = {};

    // Se crea el proyecto y se conecta el administrador mediante el id
    const newProject = await prisma.project.create({
      data: {
        name,
        description,
        admin: {
          connect: { id: administradorId },
        },
      },
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        admin: { select: { id: true, name: true, email: true } },
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

export const updateProjectService = async ({ id, name, description, administradorId }) => {
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

    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: updateData,
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        admin: { select: { id: true, name: true, email: true } },
      },
    });

    return {
      status: 200,
      message: "Proyecto actualizado correctamente.",
      data: updatedProject,
    };
  } catch (error) {
    throw new Error(`Error al actualizar el proyecto: ${error.message}`);
  }
};

export const deleteProjectService = async (id) => {
  try {
    let response = {};
    const projectId = parseInt(id, 10);

    // Primero eliminamos las asociaciones en la tabla intermedia (UserProject)
    await prisma.userProject.deleteMany({
      where: { projectId },
    });

    // Luego eliminamos el proyecto
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
