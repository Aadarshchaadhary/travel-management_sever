import { v2 as cloudinary } from "cloudinary";
import { cloudinary_config } from "./config.js";

cloudinary.config({
  cloud_name: cloudinary_config.cloud_name,
  api_key: cloudinary_config.api_key,
  api_secret: cloudinary_config.api_secret,
});
export default cloudinary;
