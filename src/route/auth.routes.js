import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import { uploader } from "../middlewares/uploader.middlewares.js";

const router = express.Router();
const upload = uploader();

// * register user
router.post("/register", upload.single("profile_image"), register);

// !login/ user
router.post("/login", login);

export default router;
