import express from "express";
import { put, get, getALL, remove } from "../controllers/user.controller.js";

const router = express.Router();

// *update profile
router.put("/:id", put);
//  get
router.get("/:id", get);
// ? get all users
router.get("/", getALL);
// delete
router.delete("/:id", remove);

export default router; // !using routing
