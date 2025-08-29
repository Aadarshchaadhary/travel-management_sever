import { jwt_config } from "../config/config.js";
import AppError from "../middlewares/error-handler.middlewares.js";
import jwt from "jsonwebtoken";

//  generate token
// @payload name ,email,id,role
export const generate_token = (payload) => {
  try {
    return jwt.sign(payload, jwt_config.secret, {
      expiresIn: jwt_config.expires_in,
    });
  } catch (error) {
    console.log(error);
    throw new AppError("token generation error", 500);
  }
};

// verify token
export const verify_token = (token) => {
  try {
    return jwt.verify(token, jwt_config.secret);
  } catch (error) {
    console.log(error);
    throw new AppError("User verification error", 401);
  }
};
