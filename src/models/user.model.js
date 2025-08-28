import mongoose from "mongoose";
import { Gender, Role } from "../config/constants.js";

export const users = [];

const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "First name is required"],
    },
    last_name: {
      type: String,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "user with provieded email alredy exists"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      select: false,
    },
    phone: {
      type: String,
    },
    profile_image: {
      path: {
        type: String,
      },
      public_id: {
        type: String,
      },
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.USER,
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
