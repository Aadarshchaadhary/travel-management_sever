import mongoose from "mongoose";
const packageing = [];
export const users = [];
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});
// create
export const create = (request, response) => {
  const data = request.body;
  console.log(data);

  if (!data) {
    response.status(400).json({
      message: "Account created",
      status: "error",
    });
    return;
  }
  packageing.push(data);
  response.status(400).json({
    massage: "account createad",
    status: "successfully",
  });

  response.status(201).json({
    message: "package created",
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

  packageing.push(data);
  response.status(400).json({
    message: "....",
    status: "",
  });

  response.status(200).json({
    message: "package fetched sucessfully",
    status: "sucsess",
  });
};
//  GetById
export const getById = (request, response) => {
  const data = request.body;
  console.log(data);

  if (!data) {
    response.status(400).json({
      message: ".....",
      status: "",
    });
    return;
  }

  packageing.push(data);
  response.status(400).json({
    message: "....",
    status: "...",
  });

  response.status(200).json({
    messgae: "package fetched",
    status: "success",
  });
};
// delete
export const remove = (request, response) => {
  const data = request.body;
  console.log(data);

  if (!data) {
    response.status(400).json({
      message: "...",
      status: "",
    });
    return;
  }

  packageing.push(data);
  response.staus(400).json({
    message: "..",
    status: "sucessfull",
  });

  response.status(200).json({
    messgae: "package deleted",
    status: "success",
  });
};
// update
export const update = (request, response) => {
  const data = request.body;
  console, log(data);

  if (!data) {
    response.status(400).json({
      message: "..",
      status: "error",
    });
    return;
  }
  packageing.push(data);
  response.status(400).json({
    message: "..",
    status: "success",
  });

  response.status(200).json({
    message: "package updated",
    status: "success",
  });
};
