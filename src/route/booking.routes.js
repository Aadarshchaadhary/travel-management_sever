import express from "express";
import {
  book,
  getAll,
  getById,
  remove,
  update,
} from "../controllers/booking.controller.js";

const router = express.Router();

// ! booking

// post
router.post("/", book);
// get
router.get("/", getAll);
// get by id
router.get("/:id", getById);
// delete
router.delete("/:id", remove);
//  update
router.put("/:id", update);

export default router;
