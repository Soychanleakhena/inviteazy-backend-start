import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const userSchema = z.object({
  fullname: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["admin", "public", "tourist"]),
  phone_number: z.string().min(8),
  profile_picture: z.string().url().optional(), // Optional and must be a valid URL
  address: z.string().min(5),
});

const eventSchema = z.object({
  user_id: z.string().min(1),
  name: z.string().min(3),
  datetime: z.string(),
  location: z.string().min(8),
  description: z.string().min(8),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const idParamSchema = z.object({
  id: z.string(),
});

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    userSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.errors[0].message });
      return;
    }
    next(error);
  }
};

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    loginSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.errors[0].message });
      return;
    }
    next(error);
  }
};

export const validateIdInURLParam = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    idParamSchema.parse(req.params);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.errors[0].message });
      return;
    }
    next(error);
  }
};

export const validateEvent = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    eventSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log("--------------- ", error.errors[0].message);
      res.status(400).json({ message: error.errors[0].message });
      return;
    }
    next(error);
  }
};

