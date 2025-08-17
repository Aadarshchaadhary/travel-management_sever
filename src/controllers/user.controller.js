import { request } from "express";
import User from "../models/user.model.js";

const users = [];
// getall
export const getALL = async (request, response, next) => {
  try {
    const users = await User.find({});

    response.status(200).json({
      message: " all user  fetched",
      status: "success",
      data: users,
    });
  } catch (error) {
    next({
      message: error.message || "something went wrong",
      status: "error",
      statusCode: 500,
    });
  }
};

// getById
export const getById = async (request, response, next) => {
  try {
    const { user_id } = request.params;
    const user = await User.findOne({ _id: user_id });
    if (!user) {
      next({
        message: "user not found",
        status: "faild",
        statusCode: 400,
      });
    }

    response.status(200).json({
      message: "user by id fetched",
      status: "success",
      data: user,
    });
  } catch (error) {
    next({
      message: error.message || "something went wrong",
      status: "error",
      statusCode: 400,
    });
  }
};
// delete
export const remove = async (request, response, next) => {
  try {
    const { user_id } = request.params;
    const user = await User.findByIdAndDelete(user_id);

    if (!user) {
      next({
        message: "user not found",
        status: "faild",
        statusCode: 400,
      });
    }

    response.status(200).json({
      message: " user deleted",
      status: "successful",
      data: user,
    });
  } catch (error) {
    next({
      message: error.message || "something went wrong",
      status: "error",
      statusCode: 400,
    });
  }
};

// update
export const put = async (request, response, next) => {
  try {
    const { user_id } = request.params;
    const { first_name, last_name, gender, phone } = request.body;

    const user = await User.findByIdAndUpdate(
      user_id,
      { first_name, last_name, gender, phone },
      { new: true, revalidate: true }
    );
    if (!user) {
      next({
        message: "User not found",
        status: "faild",
        statusCode: 404,
      });
    }

    response.status(200).json({
      message: "User profile update",
      status: "success",
    });
  } catch (error) {
    next({
      message: error.message || "something went wrong",
      status: "error",
      statusCode: 400,
    });
  }
};
