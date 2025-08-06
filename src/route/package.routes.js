import express from "express";
import {
  create,
  get,
  getById,
  remove,
  update,
} from "../controllers/package.controllers.js";

const router = express.Router();

// post
router.post("/", create);
// get
router.get("/", get);
// get by id
router.get("/:id", getById);
// delete
router.delete("/:id", remove);
// update
router.put("/:id", update);

export default express;
