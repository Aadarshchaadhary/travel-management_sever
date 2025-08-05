import express from "express";

const router = express.Router();

// post
router.post("/", (request, response) => {
  response.status(201).json({
    message: "package created",
    status: "success",
  });
});
// get
router.get("/", (request, response) => {
  response.status(200).json({
    message: "package fetched sucessfully",
    status: "sucsess",
  });
});
// get by id
router.get("/:id", (request, response) => {
  response.status(200).json({
    messgae: "package fetched",
    status: "success",
  });
});
// delete
router.delete("/:id", (request, response) => {
  response.status(200).json({
    messgae: "package deleted",
    status: "success",
  });
});
// update
router.put("/:id", (request, response) => {
  response.status(200).json({
    message: "package updated",
    status: "success",
  });
});

export default express;
