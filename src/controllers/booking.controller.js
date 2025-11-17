import Booking from "../models/booking.model.js";
import AppError from "../middlewares/error-handler.middlewares.js";
import Tour_package from "../models/package.model.js";
import { model } from "mongoose";
import { package_cost_type } from "../config/constants.js";
import { type } from "os";

// *post booking
export const book = async (req, res, next) => {
  const { tour_package, total_person, phone, full_name } = req.body;
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
      phone,
      full_name,
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
    let filter = {};
    const {
      query,
      type,
      customer_name,
      destination,
      email,
      booking_ref,
      page = 1,
      limit = 10,
    } = req.query; // ✅ filters should come from query params

    const current_page = Number(page);
    const query_limit = Number(limit);
    const skip = (current_page - 1) * query_limit;

    // 🔍 Global search (search across multiple fields)
    if (query) {
      filter.$or = [
        { customer_name: { $regex: query, $options: "i" } },
        { destination: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { booking_ref: { $regex: query, $options: "i" } },
      ];
    }

    // 🎯 Individual field filters
    if (customer_name)
      filter.customer_name = { $regex: customer_name, $options: "i" };
    if (destination)
      filter.destination = { $regex: destination, $options: "i" };
    if (email) filter.email = { $regex: email, $options: "i" };
    if (booking_ref)
      filter.booking_ref = { $regex: booking_ref, $options: "i" };

    //  Type filter
    if (type) filter.cost_type = type;

    //  Count for pagination
    const total = await Booking.countDocuments(filter);

    //  Fetch with pagination
    const bookings = await Booking.find(filter).skip(skip).limit(query_limit);

    res.status(200).json({
      message: "Bookings fetched successfully",
      status: "success",
      meta: {
        total,
        current_page,
        total_pages: Math.ceil(total / query_limit),
        limit: query_limit,
      },
      data: bookings,
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
  const { total_person, full_name, phone } = req.body;

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
    if (full_name) booking.full_name = full_name;
    if (phone) booking.phone = phone;

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
