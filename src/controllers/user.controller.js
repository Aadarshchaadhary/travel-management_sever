import { request } from "express";

const users = [];
// create
export const put = (request, response) => {
  const data = request.body;
  console.log(data);

  if (!data) {
    response.status(400).json({
      message: "..",
      status: "..",
    });
    return;
  }

  users.push(data);
  response.status(400).json({
    message: "...",
    status: "..",
  });

  response.status(200).json({
    message: "User profile update",
    status: "success",
  });
};

// get
export const get = (request, response) => {
  const data = request.body;
  console.log(data);

  if (!data) {
    response.status(400).json({
      message: "....",
      status: "",
    });
    return;
  }
  users.push(data);
  response.status(400).json({
    message: "...",
    status: "",
  });

  response.status(200).json({
    message: "user by id fetched",
    status: "success",
  });
};
// getall
export const getALL = (request, response) => {
  const data = request.body;
  console.log(data);

  if (!data) {
    response.status(400).json({
      message: "..",
      status: "error",
    });
    return;
  }

  users.push(data);
  response.status(400).json({
    message: "...",
    status: "successfully",
  });

  console.log("hello");
  response.status(200).json({
    message: " all user  fetched",
    status: "success",
  });
};
// delete
export const remove = (resquest, response) => {
  const data = request.body;
  console.log(data);

  if (!data) {
    response.status(400).json({
      message: "..",
      status: "error",
    });
    return;
  }

  users.push(data);
  response.status(400).json({
    message: "...",
    status: "successfully",
  });
  response.status(200).json({
    message: " user deleted",
    status: "successful",
  });
};
