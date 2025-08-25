import multer from "multer";
import fs from "fs";

export const uploader = (destination = "/") => {
  const uploade_folder = "uploads" + destination;
  const size_limit = 5 * 1024 * 1024; // 5mb
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
  const upload = multer({ storage: storage, limits: { fileSize: size_limit } });
  return upload;
};
