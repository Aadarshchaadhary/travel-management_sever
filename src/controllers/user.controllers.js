export const put = (request, response) => {
  response.status(200).json({
    message: "User profile update",
    status: "success",
  });
};

export const get = (request, response) => {
  response.status(200).json({
    message: "user by id fetched",
    status: "success",
  });
};

export const getALL = (request, response) => {
  response.status(200).json({
    message: " all user  fetched",
    status: "success",
  });
};

export const remove = (resquest, response) => {
  response.status(200).json({
    message: " user deleted",
    status: "successful",
  });
};
