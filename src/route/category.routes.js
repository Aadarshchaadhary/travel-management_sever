import express from "express";

import {
  create,
  getAll,
  getById,
  upadate,
  remove,
} from "../controllers/category.controllers.js";
import { uploader } from "../middlewares/uploader.middlewares.js";
import { authenticate } from "../middlewares/auth.middlewares.js";
import { Role } from "../config/constants.js";

const router = express.Router();
const upload = uploader();

router.post("/", authenticate([Role.ADMIN]), upload.single("logo"), create);
router.put("/:id", authenticate([Role.ADMIN]), upload.single("logo"), upadate);
router.get("/:id", getById);
router.get("/", getAll);
router.delete("/", authenticate([Role.ADMIN]), remove);
export default router;
