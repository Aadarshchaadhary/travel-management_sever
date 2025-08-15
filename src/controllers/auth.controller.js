// req.url
// params
// query
// body

import User from "../models/user.model.js";

export const register = async (request, response, next) => {
  // * implement actual user register logic
  try {
    const data = request.body;
    // console.log(request.body);

    if (!data) {
      response.status(400).json({
        message: "data expected",
        status: "error",
      });
      return;
    }
    // users.push(data);
    // insert user data to database user collection
    const user = await User.create({ ...data });

    response.status(201).json({
      message: "Account created",
      status: "success",
      user,
    });
  } catch (error) {
    next({
      message: error?.message || "something went wrong",
      status: "error",
      statusCode: 500,
    });
  }
};

export const login = async (request, response, next) => {
  // * implement actual user login logic
  try {
    const data = request.body;
    console.log(data);

    if (!data) {
      response.status(400).json({
        message: "data expected",
        status: "error",
      });
      return;
    }

    const users = await User.findOn({ email: data.email });

    if (!users) {
      next({
        message: "email or password does not  match",
        status: "error",
      });
      return;
    }

    const ispassmatch = users.password === data.password;

    if (!ispassmatch) {
      next({
        message: "email or password does not  match",
        status: "error",
      });
      return;
    }

    response.status(201).json({
      message: " user login success",
      status: "success",
    });
  } catch (error) {
    next({
      message: error?.message || "something went wrong",
      status: "error",
      statusCode: 500,
    });
  }
};
