import mongoose from "mongoose";
import { package_cost_type } from "../config/constants.js";

const package_schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
      minlenght: [5, "name is atleast 5 char long"],
      unique: [true, "package is already exists with provided name "],
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "category  is required"],
      ref: "category",
    },
    //  cover_image
    cover_image: {
      type: {
        paths: String,
        public_id: String,
      },
      required: [true, "Vover images is required"],
    },

    // images
    images: [
      {
        type: {
          path: String,
          public_id: String,
        },
        required: [true, "Images is reqired"],
        minlenght: [2, "Atleast tow images reqired"],
      },
    ],

    description: {
      type: String,
      required: [true, "description is required"],
      minlenght: [25, "description should be  atleast 25 char long"],
    },
    price: {
      type: Number,
      required: [true, "price is required"],
      min: [0, "Price must be greater than 0"],
    },
    start_date: {
      type: Date,
      required: [true, "Tour package start date is required"],
    },
    end_date: {
      type: Date,
      required: [true, "Tour package ending date is required"],
    },

    total_seats: {
      type: Number,
      required: [true, "total seat is required"],
      min: [0, "total seats must be greater than 0"],
    },

    seats_available: {
      type: Number,
      required: [true, "Available seat is required"],
      min: [0, "total seats must be greater than 0"],
    },
    destination: [
      {
        type: {
          location: String,
          time: String,
        },
      },
    ],
    cost_type: {
      type: String,
      enum: Object.values(package_cost_type),
      default: package_cost_type.PER_PERSON,
    },
  },
  { timestamps: true }
);

const Tour_package = mongoose.model("tour_package", package_schema);

export default Tour_package;
