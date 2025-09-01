import express, { Router } from "express";

import {
  create,
  getAll,
  getById,
  upadate,
  remove,
} from "../controllers/category.controllers.js";
import { uploader } from "../middlewares/uploader.middlewares.js";

const router = express.Router();
const upload = uploader();

router.post("/", upload.single("logo"), create);
router.put("/:id", upload.single("logo"), upadate);
router.get("/:id", getById);
router.get("/", getAll);
router.delete("/", remove);
export default router;
