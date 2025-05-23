import { Router } from "express";
import { validateEvent } from "../middlewares/validationMiddleware";
import { EventController } from "../controllers/eventController";
import { authMiddleware } from "../middlewares/authMiddleware";

export default function eventRoutes(controller: EventController): Router {
  const router = Router();

  router.post("/", authMiddleware,  controller.createEvent.bind(controller));
  router.get("/getAll",  controller.getAllEvent.bind(controller));
  router.get("/:user_id", controller.getEventsByUserId.bind(controller));

  return router;
}
