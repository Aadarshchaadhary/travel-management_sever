import express from "express";
import { get, getALL, remove, update } from "../controllers/user.controller.js";
import { uploader } from "../middlewares/uploader.middlewares.js";

const router = express.Router();
const upload = uploader();

// *update profile
router.put("/:id", upload.single("profile_image"), update);
//  get
router.get("/:id", get);
// ? get all users
router.get("/", getALL);
// delete
router.delete("/:id", remove);

export default router; // !using routing
