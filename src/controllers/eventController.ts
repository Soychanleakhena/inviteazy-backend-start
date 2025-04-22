import { NextFunction, Request, Response } from "express";
import { IUser, IUserService } from "../interfaces/userInterface";
import { IEvent, IEventService } from "../interfaces/eventInterface";
import { AuthRequest } from "../middlewares/authMiddleware";
export class EventController {
  private eventService: IEventService;

  constructor(eventService: IEventService) {
    this.eventService = eventService;
  }

  async createEvent(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, datetime, location, description }: Omit<IEvent, "id"> = req.body;
      const { id } = req.user; 
      console.log(id) // Ensure user_id is coming from params or body
      
      if (!id) {
        res.status(400).json({ message: "user_id is required" });
      }
  
      const newEvent = await this.eventService.createEvent({
        user_id: id,
        name,
        datetime,
        location,
        description,
       
      });
  
      res.status(201).json({
        message: "A new event was created.",
        data: newEvent,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  
  

  async getAllEvent(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.baseUrl, req.originalUrl);

      const result = await this.eventService.getAllEvent();
      console.log(result);
      res.json({ message: "Get all events.", data: result });
      return;
    } catch (error) {
      next(error);
    }
  }
}
