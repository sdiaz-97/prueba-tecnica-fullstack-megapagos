import { Router } from "express";
import { authenticateJWT } from "../utils/auth.middleware.js";
import {
  getUsersController,
  deleteUserController,
  postUserController,
  updateUserController
} from "../controllers/user.controller.js";
import { authorizeRole } from "../utils/role.middleware.js";

const routerUsers = Router();

routerUsers.get(
  "/",
  authenticateJWT,
  authorizeRole("admin"),
  getUsersController
);

routerUsers.post(
  "/",
  postUserController
);

routerUsers.put(
  "/",
  authenticateJWT,
  authorizeRole("admin"),
  updateUserController
);

routerUsers.delete(
  "/",
  authenticateJWT,
  authorizeRole("admin"),
  deleteUserController
);

export default routerUsers;
