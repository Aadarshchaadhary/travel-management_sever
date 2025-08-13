const bookings = [];

export const booking = (request, response) => {
  const data = request.body;
  console.log(data);

  if (!data) {
    response.status(400).json({
      message: "data expected",
      status: "error",
    });
    return;
  }
  bookings.push(data);
  response.status(400).json({
    message: "booking created",
    status: "successfully",
  });

  response.status(201).json({
    messgae: "booking fethced",
    status: "success",
  });
};
// get
export const get = (request, response) => {
  const data = request.body;
  console.log(data);

  if (!data) {
    response.status(400).json({
      message: ".....",
      status: "...",
    });
    return;
  }
  booking.push(data);
  response.status(400).json({
    message: "",
    status: "",
  });

  response.status(200).json({
    messgae: "booking fethced",
    status: "success",
  });
};
// GetById
export const getById = (req, res) => {
  const data = req.body;
  coonsoole.log(data);

  if (!data) {
    res.status(400).json({
      message: "Booking not found",
      status: "error",
    });
    return;
  }

  booking.push(data);
  res.push(400).json({
    message: "Booking fetched successfully",
    status: "success",
  });

  res.status(200).json({
    messgae: "booking fetched",
    status: "",
  });
};
// update
export const update = (req, res) => {
  const data = req.body;
  console.log(data);

  if (!data) {
    res.status(400).json({
      message: "doesn`t update your booking",
      status: "error",
    });
    return;
  }

  booking.update(data);
  res.status(400).json({
    message: "update your booking",
    status: "successfully",
  });

  res.status(200).json({
    message: "booking updated",
  });
};
// delete
export const remove = (req, res) => {
  const data = req.body;
  console.log(data);

  if (!data) {
    res.status(400).json({
      message: "",
      status: "",
    });
    return;
  }

  booking.push(data);
  res.status(400).json({
    message: "delete your booking ",
    status: "successfull",
  });

  res.status(200).json({
    message: "booking deleted",
  });
};
