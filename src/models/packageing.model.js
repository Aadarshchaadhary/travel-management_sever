import mongoose from "mongoose";
const packageing = [];
export const users = [];
const packageingSchema = new mongoose.Schema({
  package_name: {
    type: String,
    required: true,
  },
  package_ID: {
    type: Number,
    required: true,
  },

  location: {
    type: String,
    number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});
//  creating database collection(model)/ mongoose model
const Packege = mongoose.Schema("user", packageingSchema);
export default Packege;
