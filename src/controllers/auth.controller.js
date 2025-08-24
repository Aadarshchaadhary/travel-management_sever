// req.url
// params
// query
// body
import AppError from "../middlewares/error-handler.middlewares.js";
import User from "../models/user.model.js";
import { compare_password, hash_password } from "../utils/bcrypts.utils.js";

export const register = async (request, response, next) => {
  // * implement actual user register logic
  try {
    const { first_name, last_name, email, password, Phone, gender } =
      request.body;
    // console.log(request.body);
    if (!password) {
      throw new AppError("PASSWORD  IS REQUIRED", 400);
    }
    const hashed = await hash_password(password);

    // insert user data to database user collection
    const user = await User.create({
      first_name,
      last_name,
      email,
      password: hashed,
      Phone,
      gender,
    });

    response.status(201).json({
      message: "Account created",
      status: "success",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (request, response, next) => {
  // * implement actual user login logic
  try {
    const { email, password } = request.body;
    if (!password) {
      throw new AppError("password is required", 400);
    }
    if (!email) {
      throw new AppError("email is eequired", 400);
    }

    const users = await User.findOn({ email });

    if (!users) {
      next({
        message: "email or password does not  match",
        status: "error",
      });
      return;
    }

    // const ispassmatch = users.password === data.password;
    const ispassmatch = compare_password();

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
