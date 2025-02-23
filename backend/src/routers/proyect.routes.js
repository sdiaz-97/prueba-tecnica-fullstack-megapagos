import { Router } from "express";
import { authenticateJWT } from "../utils/auth.middleware.js";
import {
  getProjectsController,
  postProjectController,
  updateProjectController,
  deleteProjectController
} from "../controllers/proyect.controller.js";
import { authorizeRole } from "../utils/role.middleware.js";

const routerProyects = Router();

routerProyects.get(
  "/",
  // authenticateJWT,
  // authorizeRole("admin", "user"),
  getProjectsController
);

routerProyects.post(
  "/",
  // authenticateJWT,
  // authorizeRole("admin"),
  postProjectController

);

routerProyects.put(
  "/",
  // authenticateJWT,
  // authorizeRole("admin"),
  updateProjectController

);

routerProyects.delete(
  "/",
  // authenticateJWT,
  // authorizeRole("admin"),
  deleteProjectController

);



export default routerProyects;
