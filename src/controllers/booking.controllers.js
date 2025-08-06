export const booking = (request, response) => {
  response.status(201).json({
    messgae: "booking fethced",
    status: "success",
  });
};

export const get = (request, response) => {
  response.status(200).json({
    messgae: "booking fethced",
    status: "success",
  });
};

export const getById = (req, res) => {
  res.status(200).json({
    messgae: "booking fetched",
  });
};

export const update = (req, res) => {
  res.status(200).json({
    message: "booking updated",
  });
};

export const remove = (req, res) => {
  res.status(200).json({
    message: "booking deleted",
  });
};
