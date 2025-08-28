import User from "../models/user.model.js";
import AppError from "../middlewares/error-handler.middlewares.js";
import { delete_file, upload_file } from "../utils/cloudinary.utils.js";

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
    next(Error);
  }
};

// getById
export const getById = async (request, response, next) => {
  try {
    const { user_id } = request.params;
    const user = await User.findOne({ _id: user_id });
    if (!user) {
      throw AppError("user not found", 404);
    }

    response.status(200).json({
      message: "user by id fetched",
      status: "success",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
// delete
export const remove = async (request, response, next) => {
  try {
    const { user_id } = request.params;
    const user = await User.findBy(user_id);

    if (!user) {
      throw AppError("user not found", 404);
    }
    if (!user.profile_image) {
      await delete_file(user.profile_image.public_id);
    }
    await user.deleteOne();

    response.status(200).json({
      message: " user deleted",
      status: "successful",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// update
export const update = async (request, response, next) => {
  try {
    const { user_id } = request.params;
    const { first_name, last_name, gender, phone } = request.body;
    const file = request.file;

    const user = await User.findByIdAndUpdate(
      user_id,
      { first_name, last_name, gender, phone },
      { new: true, revalidate: true }
    );
    if (!user) {
      throw AppError("user not found", 404);
    }
    if (file) {
      // * delete old profile_image
      if (user.profile_image) {
        await delete_file(user.profile_image.public_id);
      }
      // * upload new file
      const {} = await upload_file(file, path);

      // * update new profile_image
      user.profile_image = {
        path,
        public_id,
      };
    }

    response.status(200).json({
      message: "User profile update",
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};
