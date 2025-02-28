import { buildResponse } from "../utils/response.helper.js";
import {
  getUsersService,
  deleteUserService,
  postUserService,
  updateUserService
} from "../services/user.service.js";
import jwt from "jsonwebtoken";

export const getUsersController = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const users = await getUsersService({ page, limit, search });

    res
      .status(200)
      .json(buildResponse(200, "Usuarios consultados correctamente.", users));
  } catch (error) {
    res
      .status(400)
      .json(
        buildResponse(
          400,
          `Error al consultar los usuarios: ${error.message}`,
          null
        )
      );
  }
};

export const postUserController = async (req, res) => {
  try {
    let { name, email, password, roleId, administradorId } = req.body;
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      const typeUser = jwt.verify(token, process.env.JWT_SECRET);
      if (typeUser.role != "admin") {
        roleId = "Usuario";
      }
    } else {
      roleId = "Usuario";
    };
    const response = await postUserService({
      name,
      email,
      password,
      roleId,
      administradorId
    });

    res
      .status(response.status)
      .json(buildResponse(response.status, response.message, response));

  } catch (error) {
    res
      .status(400)
      .json(
        buildResponse(
          400,
          `Error al crear el usuario: ${error.message}`,
          null
        )
      );
  }
};

export const updateUserController = async (req, res) => {
  try {
    const { id } = req.query;
    const { name, email, password, roleId, administradorId } = req.body;

    const response = await updateUserService({
      id,
      name,
      email,
      password,
      roleId,
      administradorId,
    });

    return res
      .status(200)
      .json(buildResponse(response.status, response.message, response.data));
  } catch (error) {
    return res
      .status(400)
      .json(
        buildResponse(
          400,
          `Error al actualizar el usuario: ${error.message}`,
          null
        )
      );
  }
};

export const deleteUserController = async (req, res) => {
  try {
    const { id } = req.query;
    const response = await deleteUserService(id);
    res
      .status(200)
      .json(buildResponse(response.status, response.message, response.data));
  } catch (error) {
    res
      .status(400)
      .json(
        buildResponse(
          400,
          `Error al eliminar el usuario: ${error.message}`,
          null
        )
      );
  }
};
