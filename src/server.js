import "dotenv/config";
import express from "express";

// ! importing routes
import userRoutes from "./route/auth.routes.js";
import packageRoutes from "./route/package.routes.js";
import bookingRoutes from "./route/booking.routes.js";
import authRoutes from "./route/auth.routes.js";
import AppError, {
  errorHandler,
} from "./middlewares/error-handler.middlewares.js";
import { connect_db } from "./config/mongodb.config.js";

const PORT = 8000;
// ! connecting to database
connect_db();

// !middlewares
// * is a function that runs on req , res cycle
// * & as access to req object , res object and next function

// task
// can executes a block of code
// cam modify req and res object
// can end the req , res cycle
// can call the next middlewares of stack

// ? types of middleware
// * inbuilt
// * custom
// * third party

// ? categorya
// * aplllication level
// * route level

// * error handler
// (req,res,next)
// error object

//
const middleware1 = (req, res, next) => {
  console.log(" I am middleware one");
  req.user = {
    name: "demo user",
    email: "demouser@gmail.com",
  };

  next("true");
};

const middleware2 = (req, res, next) => {
  console.log(" I am middleware two ");

  console.log(req.user);

  next();
};

// ! creating express app instance
const app = express();

// * using middleware
// app.use(middleware1);
// app.use(middleware2);

app.use(express.json({ limit: "10mb" }));

// mid2 -> mid1 -> express.json() -> midn

// *ping route
app.get("/", (request, response) => {
  response.status(200).json({
    message: "server is up & running",
  });
});

// !using routing

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/package", packageRoutes);
app.use("/booking", bookingRoutes);

// path not found
app.use((req, res, next) => {
  const message = `can not ${req.method} on ${req.originalUrl}`;

  const error = new AppError(message, 404);
  next(error);
});

//*models
// user model
// package model
// bo0king model
//

// *controllers (handlers)
// user controllers
// package controlles
// bo0king controlers

// * route
// user
// package
// booking

//*listening  on server
app.listen(PORT, () => {
  console.log(`server is up and running at http://localhost:${PORT}`);
  console.log(`press ctrl + c to close server..`);
});

// * using error handler
app.use(errorHandler);
