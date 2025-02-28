import { Router } from "express";
import {
  postLoginController
} from "../controllers/auth.controller.js";

const routerLogin = Router();

routerLogin.post("/login", postLoginController);

export default routerLogin;
