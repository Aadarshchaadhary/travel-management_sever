import AppError from "../middlewares/error-handler.middlewares.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = "";
const JWT_EXPIRES_IN = "7d";

//  generate token
// @payload name ,email,id,role
export const generate_token = (payload) => {
  try {
    return jwt.sing(payload, JWT_SECRET, {
      expiresIN: JWT_EXPIRES_IN,
    });
  } catch (error) {
    console.log(error);
    throw new AppError("token generation error", 500);
  }
};

// verify token
export const verify_token = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.log(error);
    throw new AppError("User verification error", 401);
  }
};
