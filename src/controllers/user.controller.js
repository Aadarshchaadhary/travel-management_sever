import User from "../models/user.model.js";
import AppError from "../middlewares/error-handler.middlewares.js";
import { delete_file, upload_file } from "../utils/cloudinary.utils.js";

const users = [];
// getall
import User from "../models/user.model.js";

export const getALL = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, first_name, last_name } = req.query;

    const current_page = Number(page);
    const query_limit = Number(limit);
    const skip = (current_page - 1) * query_limit;

    let filter = {};

    // 🎯 Optional filters
    if (first_name) filter.first_name = { $regex: first_name, $options: "i" };
    if (last_name) filter.last_name = { $regex: last_name, $options: "i" };

    // 📊 Count total users for pagination
    const total = await User.countDocuments(filter);

    // ⏳ Apply filter + pagination
    const users = await User.find(filter).skip(skip).limit(query_limit);

    res.status(200).json({
      message: "All users fetched",
      status: "success",
      meta: {
        total,
        current_page,
        total_pages: Math.ceil(total / query_limit),
        limit: query_limit,
      },
      data: users,
    });
  } catch (error) {
    next(error);
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
      const { path, public_id } = await upload_file(file.path);

      // * update new profile_image
      user.profile_image = {
        path,
        public_id,
      };
    }
    await user.save();

    response.status(200).json({
      message: "User profile update",
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};
