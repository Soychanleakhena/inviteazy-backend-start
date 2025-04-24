import { Request, Response, NextFunction } from "express";
import { IUserService } from "../interfaces/userInterface";
import redisCache from "../services/cacheService";

export class UserController {
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { fullname, email, password, role, phone_number, profile_picture, address } = req.body;

      const newUser = await this.userService.createUser({
        fullname,
        email,
        password,
        role,
        phone_number,
        profile_picture,
        address,
      });

      res.status(201).json({ message: "A new user was created.", data: newUser });
    } catch (err) {
      if (err instanceof Error && err.message === "Required") {
        res.status(400).json({ message: "Required" });
      } else {
        next(err);
      }
    }
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.userService.getAllUsers();
      res.json({ message: "Get all users", data: result });
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const cacheKey = `data:${req.method}:${req.originalUrl}`;
      const cacheData = await redisCache.get(cacheKey);
      if (cacheData) {
        res.json({ message: "Cache: Get user by ID", data: JSON.parse(cacheData) });
        return; // optional
      }
  
      const result = await this.userService.getUserById(req.params.id);
      await redisCache.set(cacheKey, JSON.stringify(result));
      res.json({ message: "API: Get user by ID", data: result });
    } catch (error) {
      next(error);
    }
  }
  
}
