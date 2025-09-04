import multer from "multer";
import fs from "fs";
import path from "path";
import AppError from "./error-handler.middlewares.js";

export const uploader = (destination = "/") => {
  const uploade_folder = "uploads" + destination;
  const size_limit = 5 * 1024 * 1024; // 5mb

  const allowed_extentions = [
    "png",
    "jpg",
    "jpeg",
    "webb",
    "svg",
    "gif",
    "avif",
  ];
  const storage = multer.diskStorage({
    destination: (req, res, cb) => {
      if (!fs.existsSync(uploade_folder)) {
        fs.mkdirSync(uploade_folder, { recursive: true });
      }
      cb(null, uploade_folder);
    },
    filename: (req, file, cb) => {
      const unique_name = Date.now() + "-" + file.originalname;
      cb(null, unique_name);
      // cb(null, file.originalname);
    },
  });
  // *FILEFILLTER
  const fileFilter = (req, file, cb) => {
    const ext_name = path.extname(file.originalname).replace(".", "");

    if (!allowed_extentions.includes(ext_name)) {
      const error = new AppError(
        `${ext_name}, 🌈is not allowed.only ${allowed_extentions.join(
          ","
        )} format is supported.`,
        400
      );
      cb(error);
    }
    cb(null, true);
  };

  const upload = multer({
    storage: storage,
    fileFilter,
    limits: { fileSize: size_limit },
  });
  return upload;
};
