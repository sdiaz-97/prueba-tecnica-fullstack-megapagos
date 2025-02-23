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
    const projects = await getProjectsService({ page, limit, search });
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
    const { name, description, administradorId } = req.body;
    const response = await postProjectService({
      name,
      description,
      administradorId // Opcional: si se envía, conecta el proyecto con el administrador
    });
    res
      .status(response.status)
      .json(buildResponse(response.status, response.message, response.data));
  } catch (error) {
    res.status(400).json(
      buildResponse(400, `Error al crear el proyecto: ${error.message}`, null)
    );
  }
};

export const updateProjectController = async (req, res) => {
  try {
    const { id } = req.query; // También podrías usar req.params si prefieres
    const { name, description, administradorId } = req.body;
    const response = await updateProjectService({
      id,
      name,
      description,
      administradorId
    });
    res
      .status(response.status)
      .json(buildResponse(response.status, response.message, response.data));
  } catch (error) {
    res.status(400).json(
      buildResponse(400, `Error al actualizar el proyecto: ${error.message}`, null)
    );
  }
};

export const deleteProjectController = async (req, res) => {
  try {
    const { id } = req.query; // También podrías usar req.params si lo configuras así en la ruta
    const response = await deleteProjectService(id);
    res
      .status(response.status)
      .json(buildResponse(response.status, response.message, response.data));
  } catch (error) {
    res.status(400).json(
      buildResponse(400, `Error al eliminar el proyecto: ${error.message}`, null)
    );
  }
};
