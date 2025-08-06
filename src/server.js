import express from "express";

// ! importing routes
import userRoutes from "./route/user.routes.js";
import packageRoutes from "./route/package.routes.js";
import bookingRoutes from "./route/booking.routes.js";
import authRoutes from "./route/auth.routes.js";

const PORT = 8080;

// ! creating express app instance
const app = express();

// ping route

app.get("/", (request, response) => {
  response.status(200).json({
    message: "server is up & running",
  });
});

// !using routing
app.use("/user", userRoutes);
app.use("/package", packageRoutes);
app.use("/booking", bookingRoutes);
app.use("/auth", authRoutes);

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
