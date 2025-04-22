import { Router } from "express";
import { validateEvent } from "../middlewares/validationMiddleware";
import { EventController } from "../controllers/eventController";
import { authMiddleware } from "../middlewares/authMiddleware";

export default function eventRoutes(controller: EventController): Router {
  const router = Router();

  router.post("/create", authMiddleware,  controller.createEvent.bind(controller));
  router.get("/getAll",  controller.getAllEvent.bind(controller));

  return router;
}
