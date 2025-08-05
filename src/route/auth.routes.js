

import express from 'express'

const router = express.Router()

// * register user
router.post("/register", (request,response) => {
  // * implement actual user register logic
  response.status(201).json({
    message: "User Register",
    status: "success",
  });
});


// !login/ user
router.post("/login", (request,response) => {
  // * implement actual user login logic
  response.status(201).json({
    message: " user login success",
    status: "success",
  });
});

export default express
