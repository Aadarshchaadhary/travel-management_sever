import mongoose from "mongoose";
const category_schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "category name is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "category description is required"],
      minLength: [true, "description must b atleast 25 char log"],
      trim: true,
    },
    logo: {
      type: {
        path: {
          type: String,
        },
        public_id: {
          type: String,
        },
      },
      required: [true, "logo is required"],
    },
  },
  { TimeStamps: true }
);

//  create model

const category = mongoose.model("cateory", category_schema);
export default category;
