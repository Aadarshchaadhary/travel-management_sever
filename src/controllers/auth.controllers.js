export const register = (request, response) => {
  // * implement actual user register logic
  response.status(201).json({
    message: "User Register",
    status: "success",
  });
};

export const login = (request, response) => {
  // * implement actual user login logic
  response.status(201).json({
    message: " user login success",
    status: "success",
  });
};
