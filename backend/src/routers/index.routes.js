import { Router } from "express";
import routerUsers from "./user.routes.js";
import routerLogin from "./auth.routes.js";
import routerProyects from "./project.routes.js"

const router = Router();

router.use("/", routerLogin);
router.use("/users", routerUsers);
router.use("/proyects", routerProyects);

router.get('*', (req, res) => {
    res.status(404)
    res.send({ error: 'Not found' })
})

export default router;