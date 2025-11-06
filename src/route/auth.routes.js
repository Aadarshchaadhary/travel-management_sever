import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import { uploader } from "../middlewares/uploader.middlewares.js";
import { authenticate } from "../middlewares/auth.middlewares.js";

const router = express.Router();
const upload = uploader();

// * register user
router.post("/register", upload.single("profile_image"), register);

// !login/ user
router.post("/login", login);

// auth check me
router.get("/me", authenticate([Role.ADMIN, Role.USER]).me);

export default router;
