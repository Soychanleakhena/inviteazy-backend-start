import { Router } from "express";
import { UserController } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  validateIdInURLParam,
  validateUser,
} from "../middlewares/validationMiddleware";

export default function userRoutes(controller: UserController): Router {
  const router = Router();

  router.get("/", controller.getAllUsers.bind(controller));
  router.get(
    "/:id",
    authMiddleware,
    validateIdInURLParam,
    controller.getUserById.bind(controller)
  );
  router.post("/register", validateUser, controller.createUser.bind(controller));

  return router;
}
