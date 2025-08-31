import express from "express";
import {
  create,
  getAll,
  getById,
  upadate,
  remove,
} from "../controllers/category.controllers.js";
import { uploader } from "../middlewares/uploader.middlewares.js";

const router = express.router();
const upload = uploader();

router.post("/", upload.single("logo"), create);
router.put("/", upload.single("logo"), upadate);
router.get("/:id", getById);
router.get("/", getAll);
router.delete("/", remove);
