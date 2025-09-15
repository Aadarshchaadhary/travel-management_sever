import mongoose from "mongoose";

const booking_model = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "user is required"],
    },
    tour_package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tour_package",
      required: [true, "package is required"],
    },
    total_price: {
      type: Number,
      min: [0, "Price must be positive"],
      required: [true, "price is required"],
    },

    total_person: {
      type: Number,
      default: 1,
      required: [true, "Number of persons are required"],
    },
  },
  { timestamps: true }
);
const Booking = mongoose.model("booking", booking_model);
export default Booking;
