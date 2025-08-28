import cloudinary from "../config/cloudinary.config.js";
import AppError from "../middlewares/error-handler.middlewares.js";
import fs from "fs";

export const upload_file = async (file, dest = "/") => {
  try {
    const folder_name = "/travel_mgmt" + dest;
    const { public_id, secure_url } = await cloudinary.uploader.upload(file, {
      floder: folder_name,
      unique_filename: true,
    });

    //* delete image/file uploads folder if it exists
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
    }

    return {
      path: secure_url,
      public_id,
    };
  } catch (error) {
    console.log(error);
    throw new AppError("file uploading error", 400);
  }
};
export const delete_file = async (public_id) => {
  try {
    return await cloudinary.uploader.destroy(public_id);
  } catch (error) {
    console.log(error);
    throw new AppError("file delete error", 500);
  }
};
