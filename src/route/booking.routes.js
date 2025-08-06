import express from "express";
import {
  booking,
  get,
  getById,
  remove,
  update,
} from "../controllers/package.controllers";

const router = express.Router();

// ! booking

// post
router.post("/", booking);
// get
router.get("/", get);
// get by id
router.get("/:id", getById);
// delete
router.delete("/:id", remove);
//  update
router.put("/:id", update);

export default express;
