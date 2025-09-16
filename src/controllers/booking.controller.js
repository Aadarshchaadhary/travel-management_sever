import Booking from "../models/booking.model.js";
import AppError from "../middlewares/error-handler.middlewares.js";
import Tour_package from "../models/package.model.js";
import { model } from "mongoose";
import { package_cost_type } from "../config/constants.js";
import { type } from "os";

// *post booking
export const book = async (req, res, next) => {
  const { tour_package, total_person } = req.body;
  const user = req.user._id;
  let total_price = 0;
  try {
    if (!tour_package) {
      throw new AppError("package id is required");
    }
    if (!total_person) {
      throw new AppError("number of persons is required");
    }
    const booked_tour_package = await Tour_package.findById(tour_package);

    if (!booked_tour_package) {
      throw new AppError("package not found", 404);
    }

    if (booked_tour_package.seats_available === 0) {
      throw new AppError(
        "seats already Full. ,please contact with support",
        404
      );
    }

    const book_package = new Booking.create({
      user,
      tour_package: tour_package._id,
      total_person: parseInt(total_person),
    });
    const total_days =
      (new Date(booked_tour_package.end_date).getTime() -
        new Date(booked_tour_package.start_date).getTime()) /
      (1000 * 24 * 60 * 60);

    if (booked_tour_package.cost_type === package_cost_type.PER_PERSON) {
      total_price = (parseInt(total_price) * booked_tour_package.price).toFixed(
        2
      );
    } else {
      total_price = (
        parseInt(total_price) *
        booked_tour_package.price *
        total_days
      ).toFixed(2);
    }

    booked_tour_package.seats_available -= parseInt(total_person);
    book_package.total_price = total_price;

    await booked_tour_package.save();
    await book_package.save();

    res.status(201).json({
      message: "package booked",
      status: "success",
      data: book_package,
    });
  } catch (error) {
    next(error);
  }
};

// * get all booking
export const getAll = async (req, res, next) => {
  try {
    const filter = {};

    const { customer_name, destination, email, booking_ref } = req.body;
    if (query) {
      filter.$or = [
        {
          customer_name: {
            $regex: query,
            $options: "i",
          },
        },
        {
          des: {
            $regex: query,
            $options: "i",
          },
        },
      ];
    }
    if (type) filter.cost_type = type;

    const booking = await Booking.find({});

    res.status(201).json({
      message: "booking fetched",
      status: "success",
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

// *getbyid

export const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findById({ id });

    if (!booking) {
      throw new AppError("booking not found", 404);
    }

    res.status(201).json({
      message: "booking fetched",
      status: "success",
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

// *update booking
export const update = async (req, res, next) => {
  const { id } = req.params;
  const { total_person } = req.body;

  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      throw new AppError("booking not found", 404);
    }

    const booked_tour_package = await Tour_package.findById(
      booking.tour_package
    );
    if (!booked_tour_package) {
      throw new AppError("package not found", 404);
    }

    if (total_person) {
      booked_tour_package.seats_available += booking.total_person;

      if (booked_tour_package.seats_available < total_person) {
        throw new AppError("not enough seats available", 400);
      }

      booking.total_person = parseInt(total_person);

      booked_tour_package.seats_available -= parseInt(total_person);

      const total_days =
        (new Date(booked_tour_package.end_date).getTime() -
          new Date(booked_tour_package.start_date).getTime()) /
        (1000 * 24 * 60 * 60);

      if (booked_tour_package.cost_type === package_cost_type.PER_PERSON) {
        booking.total_price = (
          booking.total_person * booked_tour_package.price
        ).toFixed(2);
      } else {
        booking.total_price = (
          booking.total_person *
          booked_tour_package.price *
          total_days
        ).toFixed(2);
      }
    }

    await booked_tour_package.save();
    await booking.save();

    res.status(200).json({
      message: "booking updated",
      status: "success",
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

// *delete booking
export const remove = async (req, res, next) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      throw new AppError("booking not found", 404);
    }

    const booked_tour_package = await Tour_package.findById(
      booking.tour_package
    );
    if (booked_tour_package) {
      booked_tour_package.seats_available += booking.total_person;
      await booked_tour_package.save();
    }

    await booking.deleteOne();

    res.status(200).json({
      message: "booking deleted",
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};
