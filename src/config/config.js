export const mongodb_config = {
  url: process.env.DB_URL,
  db_name: process.env.DB_NAME,
};
export const cloudinary_config = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
};

export const jwt_config = {
  secret: process.env.JWT_SECRET,
  expires_in: process.env.JWT_EXPIRES_IN,
};
