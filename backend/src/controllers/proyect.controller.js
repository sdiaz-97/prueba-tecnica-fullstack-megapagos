import { buildResponse } from "../utils/response.helper.js";
import {
  getProjectsService,
  postProjectService,
  updateProjectService,
  deleteProjectService
} from "../services/project.service.js";

export const getProjectsController = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const userId = req.user.id;
    const isAdmin = req.user.role === "admin";
    const projects = await getProjectsService({ page, limit, search, userId, isAdmin });
    res.status(200).json(
      buildResponse(200, "Proyectos consultados correctamente.", projects)
    );
  } catch (error) {
    res.status(400).json(
      buildResponse(400, `Error al consultar los proyectos: ${error.message}`, null)
    );
  }
};

export const postProjectController = async (req, res) => {
  try {

    const { name, description, assignedUsers } = req.body;
    const userId = req.user.id;
    const response = await postProjectService({
      name,
      description,
      userId,
      assignedUsers
    });
    res
      .status(200)
      .json(buildResponse(response.status, response.message, response.data));
  } catch (error) {
    res.status(400).json(
      buildResponse(400, `Error al crear el proyecto: ${error.message}`, null)
    );
  }
};

export const updateProjectController = async (req, res) => {
  try {
    const { id } = req.query;
    const { name, description, administradorId, assignedUsers } = req.body;
    const response = await updateProjectService({
      id,
      name,
      description,
      administradorId,
      assignedUsers
    });
    res
      .status(200)
      .json(buildResponse(response.status, response.message, response.data));
  } catch (error) {
    res.status(400).json(
      buildResponse(400, `Error al actualizar el proyecto: ${error.message}`, null)
    );
  }
};

export const deleteProjectController = async (req, res) => {
  try {
    const { id } = req.query; 
    const response = await deleteProjectService(id);
    res
      .status(200)
      .json(buildResponse(response.status, response.message, response.data));
  } catch (error) {
    res.status(400).json(
      buildResponse(400, `Error al eliminar el proyecto: ${error.message}`, null)
    );
  }
};
