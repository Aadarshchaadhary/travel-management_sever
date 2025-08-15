import mongoose from "mongoose";
import { Gender, Role } from "../config/constants.js";

export const users = [];

const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.ADMIN,
    },
    gender: {
      type: String,
      enum: Object.values(Gender),
      default: Gender.MALE,
    },
  },
  { timestamps: true }
);

//  creating database collection(model)/ mongoose model
const User = mongoose.model("user", userSchema);

export default User;
