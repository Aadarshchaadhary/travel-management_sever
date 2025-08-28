// req.url
// params
// query
// body
import AppError from "../middlewares/error-handler.middlewares.js";
import User from "../models/user.model.js";
import { compare_password, hash_password } from "../utils/bcrypts.utils.js";
import { upload_file } from "../utils/cloudinary.utils.js";
import { generate_token } from "../utils/jwt.utils.js";

export const register = async (request, response, next) => {
  // * implement actual user register logic
  try {
    console.log(request.body);
    const { first_name, last_name, email, password, Phone, gender } =
      request.body;
    const file = request.file;
    console.log(file);
    // console.log(request.body);
    if (!password) {
      throw new AppError("PASSWORD  IS REQUIRED", 400);
    }
    const hashed = await hash_password(password);

    // insert user data to database user collection
    const user = new User({
      first_name,
      last_name,
      email,
      password: hashed,
      Phone,
      gender,
    });

    if (file) {
      const { path, public_id } = await upload_file(file.path, "/avatar");
      user.profile_image = {
        path: path,
        public_id: public_id,
      };
    }

    await user.save();

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

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new AppError("email or password does not  match", 400);
    }

    // const ispassmatch = users.password === data.password;
    const ispassmatch = compare_password(password, user.password);

    if (!ispassmatch) {
      next({
        message: "email or password does not  match",
        status: "error",
      });
      return;
    }
    // *generate jwt token
    const access_token = generate_token({
      first_name: user.first_name,
      last_name: user.last_name,
      _id: user._id,
      email: user.email,
      role: user.role,
    });

    response
      .cookie("access_tooken", access_token, {
        httpOnly: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: false,
      })
      .status(201)
      .json({
        message: " user login success",
        status: "success",
        data: {
          user,
          access_token,
        },
      });
  } catch (error) {
    next({
      message: error?.message || "something went wrong",
      status: "error",
      statusCode: 500,
    });
  }
};
