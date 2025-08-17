import mongoose from "mongoose";

export const Booking = [];
const bookingSchema = mongoose.Schema({
  customer_name: {
    type: String,
    required: true,
  },

  phone_number: {
    type: Number,
    required: true,
  },

  product_details: {
    type: String,
    required: trusted,
  },

  price: {
    type: Number,
    required: true,
  },

  payemnt_details: {
    type: Number,
    required: true,
  },
});
//  creating database collection(model)/ mongoose model
const Booking = mongoose.model("book", bookingSchema);

export default Booking;
