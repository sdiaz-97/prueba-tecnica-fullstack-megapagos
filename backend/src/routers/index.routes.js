import { Router } from "express";
import routerUsers from "./user.routes.js";
import routerLogin from "./auth.routes.js";
import routerRoles from "./roles.routes.js";
import routerProyects from "./proyect.routes.js"

const router = Router();

router.use("/", routerLogin);
router.use("/users", routerUsers);
router.use("/proyects", routerProyects);
router.use("/roles", routerRoles);

export default router;
