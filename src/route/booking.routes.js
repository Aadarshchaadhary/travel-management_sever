import express from "express";

const router = express.Router();

// ! booking
// get
router.get("/", (request, response) => {
  response.status(200).json({
    messgae: "booking fethced",
    status: "success",
  });
});
// post
router.post("/", (req, res) => {
  res.status(201).json({
    message: "bookings created",
    status: "success",
  });
});
// get by id
router.get("/:id", (req, res) => {
  res.status(200).json({
    messgae: "booking fetched",
  });
});
// delete
router.delete("/:id", (req, res) => {
  res.status(200).json({
    message: "booking deleted",
  });
});
//  update
router.put("/:id", (req, res) => {
  res.status(200).json({
    message: "booking updated",
  });
});

export default express;
