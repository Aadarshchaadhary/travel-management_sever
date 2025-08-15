// req.url
// params
// query
// body

import mongoose from "mongoose";

export const users = [];

const userSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
});

//  creating database collection(model)/ mongoose model
const User = mongoose.model("user", userSchema);

export const register = async (request, response) => {
  // * implement actual user register logic
  const data = request.body;
  console.log(request.body);

  if (!data) {
    response.status(400).json({
      message: "data expected",
      status: "error",
    });
    return;
  }
  // users.push(data);
  // insert user data to database user collection
  const user = await User.create({ ...data });

  response.status(201).json({
    message: "Account created",
    status: "success",
    user,
  });
};

export const login = (request, response) => {
  // * implement actual user login logic

  const data = request.body;
  console.log(data);

  if (!data) {
    response.status(400).json({
      message: "data expected",
      status: "error",
    });
    return;
  }

  const users = users.find((usr) => usr.email === data.email);

  if (!users) {
    response.status(400).json({
      message: "email or password does not  match",
      status: "error",
    });
    return;
  }

  const ispassmatch = users.password === data.password;

  if (!ispassmatch) {
    response.status(400).json({
      message: "email or password does not  match",
      status: "error",
    });
    return;
  }

  response.status(201).json({
    message: " user login success",
    status: "success",
  });
};
