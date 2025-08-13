import express from "express";
import { register, login } from "../controllers/auth.controller.js";

const router = express.Router();

// * register user
router.post("/register", register);

// !login/ user
router.post("/login", login);

export default router;
