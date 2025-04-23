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


import { FirebaseUserRepository } from "./repositories/firebasedb/userRepository";
// import { MongoEventRepository } from "./repositories/mongodb/eventRepository";
import { initializeApp } from "firebase-admin";
import eventRoutes from "./routes/eventRoutes";
import { EventController } from "./controllers/eventController";
import { EventService } from "./services/eventService";
import { PostgresEventRepository } from "./repositories/postgres/eventRepository";



dotenv.config();

import { connectMysqlDb } from "./config/mysqldb/db";
import guestRoutes from './routes/guestRoutes';dotenv.config();
const app = express();
const port = 3001;

// Switch connection to database
// connectMongoDB();

const pgPool = connectPostgresDb();
// initializeApp();



// connectMySQL();

// const mysqlPool = connectMysqlDb();
// Repositories
// const userRepository = new MongoUserRepository();
const userRepository = new PostgresUserRepository(pgPool);
const inviteRepository = new PostgresInviteesRepository(pgPool);
// const eventRepository = new PostgresEventsRepository(pgPool);

const eventRepository = new PostgresEventRepository(pgPool);
// const eventRepository = new MongoEventRepository();

// const userRepository = new PostgresUserRepository(mysqlPool);


// Services
const userService = new UserService(userRepository);

const inviteService = new InviteeService(inviteRepository);
const eventService = new EventService (eventRepository)


// Controllers
const userController = new UserController(userService);
const authController = new AuthController(userService);

const inviteController = new InviteesController(inviteService);
const eventsController = new EventController(eventService);

// Middlewares
app.use(express.json());
app.use(loggingMiddleware);

// Routes
app.use("/api/users", userRoutes(userController));
app.use("/api/auth", authRoutes(authController));
app.use("/api/invite", InviteesRoutes(inviteController));


app.use("/api/v1", eventRoutes(eventsController));
app.use('/api/v1', guestRoutes);
// Handle Errors
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
// function connectMongoDB() {
//   throw new Error("Function not implemented.");
// }

});
