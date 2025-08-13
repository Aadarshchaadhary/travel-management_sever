// req.url
// params
// query
// body

export const users = [];

export const register = (request, response) => {
  // * implement actual user register logic
  const data = request.data;
  console.log(data);

  if (!data) {
    response.status(400).json({
      message: "data expected",
      status: "error",
    });
    return;
  }
  users.push(data);

  response.status(201).json({
    message: "Account created",
    status: "success",
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
