import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { UserService } from "./services/userService";
import { UserController } from "./controllers/userController";
import { AuthController } from "./controllers/authController";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
// import guestRoutes from './routes/guestRoutes'; // Correctly import guestRoutes
import { connectPostgresDb } from "./config/postgresdb/db";
import { PostgresUserRepository } from "./repositories/postgres/userRepository";
// import { MongoUserRepository } from "./repositories/mongodb/userRepository"; // Uncomment if MongoDB is used
// import { connectMysqlDb } from "./config/mysqldb/db"; // Uncomment if MySQL is used
import { loggingMiddleware } from "./middlewares/loggingMiddleware";
import { connectMongoDB } from "./config/mongodb/db";
// import { MongoUserRepository } from "./repositories/mongodb/userRepository";

// import { MongoEventRepository } from "./repositories/mongodb/eventRepository";
// import { initializeApp } from "firebase-admin";
import eventRoutes from "./routes/eventRoutes";
import { EventController } from "./controllers/eventController";
import { EventService } from "./services/eventService";
import { PostgresEventRepository } from "./repositories/postgres/eventRepository";


dotenv.config();

import { connectMysqlDb } from "./config/mysqldb/db";

dotenv.config();

const app = express();
const port = 3000;

// Switch connection to database
// connectMongoDB();

const pgPool = connectPostgresDb();
// initializeApp();



// connectMySQL();

// const mysqlPool = connectMysqlDb();
// Repositories
// const userRepository = new MongoUserRepository();
const userRepository = new PostgresUserRepository(pgPool);

const eventRepository = new PostgresEventRepository(pgPool);

// const eventRepository = new MongoEventRepository();

// const userRepository = new PostgresUserRepository(mysqlPool);
// const pgPool = connectPostgresDb();
// const mysqlPool = connectMysqlDb(); // Uncomment if MySQL is used
// const mongoDb = connectMongoDB(); // Uncomment if MongoDB is used

// Repositories (use the appropriate one)
// const userRepository = new MongoUserRepository(); // Uncomment if using MongoDB
// const userRepository = new PostgresUserRepository(mysqlPool); // Uncomment if using MySQL


// Services
const userService = new UserService(userRepository);
const eventService = new EventService (eventRepository)

// Controllers
const userController = new UserController(userService);
const authController = new AuthController(userService);
const eventsController = new EventController(eventService);
// Controllers

// Middlewares
app.use(express.json());
app.use(loggingMiddleware);

// Routes
app.use("/api/users", userRoutes(userController));
app.use("/api/auth", authRoutes(authController));

app.use("/api/events", eventRoutes(eventsController));
// app.use('/api/v1', guestRoutes);
// Handle Errors

app.use(errorMiddleware);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
