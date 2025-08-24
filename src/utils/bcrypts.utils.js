import AppError from "../middlewares/error-handler.middlewares.js";
import bcrypt from "bcryptjs";

// *hash user password
export const hash_password = async (password) => {
  try {
    const salt = await bcrypt.gensalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw new AppError("password hashing error", 500);
  }
};

// * compare password
export const compare_password = async (passowrd, hash) => {
  return await bcrypt.compare(passowrd, hash);
};
