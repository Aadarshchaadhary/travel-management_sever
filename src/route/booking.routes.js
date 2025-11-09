import express from "express";
import {
  book,
  getAll,
  getById,
  remove,
  update,
} from "../controllers/booking.controller.js";
import { authenticate } from "../middlewares/auth.middlewares.js";
import { Role } from "../config/constants.js";

const router = express.Router();

// ! booking

// post
router.post("/", authenticate([Role.USER]), book);
// get
router.get("/", authenticate([Role.ADMIN]), getAll);
// get by id
router.get("/:id", authenticate([Role.USER, Role.ADMIN]), getById);
// delete
router.delete("/:id", authenticate([Role.USER, Role.ADMIN]), remove);
//  update
router.put("/:id", authenticate([Role.USER, Role.ADMIN]), update);

// ? Get all user bookings
// router.get('/user',authenticate([Role.USER,]),)

export default router;
