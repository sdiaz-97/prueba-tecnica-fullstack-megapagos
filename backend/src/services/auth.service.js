import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const postLoginService = async (email, password) => {
  try {
    let response = {};
    const login = await prisma.User.findUnique({
      where: {
        email: email,
      },
    });

    if (login) {
      const isPasswordValid = await bcrypt.compare(password, login.password);
      if (!isPasswordValid) {
        response.status = 401;
        response.message = "Usuario y/o contraseña incorrectos";
        return response;
      }
      const role = login.roleId === 1 ? "admin" : "user";
      const id = login.id
      const token = jwt.sign({ email, role, id }, process.env.JWT_SECRET);
      response.status = 200;
      delete login.password;
      response.data = { tokenjwt: token, userData: login };
      response.message = "Inicio correctamente sesión";
    } else {
      response.status = 401;
      response.message = "Usuario y/o contraseña erroneos";
    }
    return response;
  } catch (error) {
    throw new Error(`Error al iniciar sesón: ${error.message}`);
  }
};
