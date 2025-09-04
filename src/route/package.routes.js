import express from "express";

import {
  create,
  get,
  getById,
  remove,
  update,
} from "../controllers/packageing.controller.js";
import { authenticate } from "../middlewares/auth.middlewares.js";
import { Role } from "../config/constants.js";

const router = express.Router();

// post
router.post("/", authenticate([Role.ADMIN]), create);
// get
router.get("/", get);
// get by id
router.get("/:id", getById);
// delete
router.delete("/:id", authenticate([Role.ADMIN]), remove);
// update
router.put("/:id", authenticate([Role.ADMIN]), update);

export default router;
