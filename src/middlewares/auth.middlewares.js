import User from "../models/user.model.js";
import { verify_token } from "../utils/jwt.utils.js";
import AppError from "./error-handler.middlewares.js";

export const authenticate = (roles = []) => {
  return async (req, res, next) => {
    try {
      // get access token from req.cookie
      const token = req.cookies.access_token;
      console.log(token);

      if (!token) {
        throw new AppError("Unauthroized. Access denied.", 401);
      }
      const decoded_data = verify_token(token);
      console.log(decoded_data);
      if (!decoded_data) {
        throw new AppError("Unauthroized. Access denied.", 401);
      }
      //  is token expired or not

      if (Date.now() > Number(decoded_data.exp) * 1000) {
        throw new AppError("Token expired. Access denied", 401);
      }

      const user = await User.findOne({
        _id: decoded_data._id,
        email: decoded_data.email,
      });

      if (!user) {
        throw new AppError("Unauthorized. Access denied", 401);
      }

      // role bases authorization
      if (
        Array.isArray(roles) &&
        roles.length > 0 &&
        !roles.includes(user.role)
      ) {
        throw new AppError("Forbidden. Access denied", 403);
      }
      //
      req.user = {
        _id: user.id,
        email: user.email,
        role: user.role,
        first_name: user.first_name,
        last_name: user.last_name,
      };

      next();
    } catch (error) {
      next(error);
    }
  };
};
