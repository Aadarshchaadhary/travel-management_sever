export const create = (request, response) => {
  response.status(201).json({
    message: "package created",
    status: "success",
  });
};

export const get = (request, response) => {
  response.status(200).json({
    message: "package fetched sucessfully",
    status: "sucsess",
  });
};

export const getById = (request, response) => {
  response.status(200).json({
    messgae: "package fetched",
    status: "success",
  });
};

export const remove = (request, response) => {
  response.status(200).json({
    messgae: "package deleted",
    status: "success",
  });
};

export const update = (request, response) => {
  response.status(200).json({
    message: "package updated",
    status: "success",
  });
};
