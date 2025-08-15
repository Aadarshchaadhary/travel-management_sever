import mongoose from "mongoose";
import { mongodb_config } from "./config.js";

export const connect_db = () => {
  mongoose
    .connect(mongodb_config.url, {
      dbName: mongodb_config.db_name,
      autoCreate: true,
    })
    .then(() => {
      console.log("database connnected successfully!");
    })
    .catch((error) => {
      console.log("database---- connection------- error------");
      console.log("error");
    });
};
