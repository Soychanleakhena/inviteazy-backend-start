import express, { Request, Response } from "express";
import userRoutes from "./routes/userRoutes";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { UserService } from "./services/userService";
import { UserController } from "./controllers/userController";
import { AuthController } from "./controllers/authController";
import authRoutes from "./routes/authRoutes";
import { connectPostgresDb } from "./config/postgresdb/db";
import { PostgresUserRepository } from "./repositories/postgres/userRepository";
import { loggingMiddleware } from "./middlewares/loggingMiddleware";
import { MongoUserRepository } from "./repositories/mongodb/userRepository";
import { connectMongoDB } from "./config/mongodb/db"
import { InviteesController } from "./controllers/inviteController";
import  InviteesRoutes  from "./routes/inviteRoutes";
import { PostgresInviteesRepository } from "./repositories/postgres/inviteaRepostory";
import { InviteeService } from "./services/inviteService";



dotenv.config();

const app = express();
const port = 3000;

// Switch connection to database
// connectMongoDB();
const pgPool = connectPostgresDb();

// Repositories
// const userRepository = new MongoUserRepository();
const userRepository = new PostgresUserRepository(pgPool);
const inviteRepository = new PostgresInviteesRepository(pgPool);
// const eventRepository = new PostgresEventsRepository(pgPool);

// Services
const userService = new UserService(userRepository);
const inviteService = new InviteeService(inviteRepository);

// Controllers
const userController = new UserController(userService);
const authController = new AuthController(userService);
const inviteController = new InviteesController(inviteService);

// Middlewares
app.use(express.json());
app.use(loggingMiddleware);

// Routes
app.use("/api/users", userRoutes(userController));
app.use("/api/auth", authRoutes(authController));
app.use("/api/invite", InviteesRoutes(inviteController));


// Handle Errors
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
// function connectMongoDB() {
//   throw new Error("Function not implemented.");
// }

