import { Router } from "express";
import { validateLogin } from "../middlewares/validationMiddleware";
import { AuthController } from "../controllers/authController";

export default function authRoutes(controller: AuthController): Router {
  const router = Router();

  router.post("/login", controller.login.bind(controller));

  return router;
}
