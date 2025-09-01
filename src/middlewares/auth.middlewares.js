import { verify_token } from "../utils/jwt.utils.js";
import AppError from "./error-handler.middlewares.js";

export const authenticate = () => {
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
      next();
    } catch (error) {
      next(error);
    }
  };
};
