import express from "express";

const router = express.Router();

// *update profile
router.put("/:id", (request, response) => {
  response.status(200).json({
    message: "User profile update",
    status: "success",
  });
});
//  get
router.get("/:id", (request, response) => {
  response.status(200).json({
    message: "user by id fetched",
    status: "success",
  });
});
// ? get all users
router.get("/", (request, response) => {
  response.status(200).json({
    message: " all user  fetched",
    status: "success",
  });
});
// delete
router.delete("/:id", (resquest, response) => {
  response.status(200).json({
    message: " user deleted",
    status: "successful",
  });
});

export default router;
