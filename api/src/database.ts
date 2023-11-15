import mongoose from "mongoose";
import { getConfig } from "./config";

const connect = async () => {
  const config = getConfig();
  await mongoose
    .connect(config.mongo.url)
    .then(() => {
      console.log("Connected to the database!");
    })
    .catch((err) => {
      console.log("Cannot connect to the database!", err);
      process.exit();
    });
};

const close = async () => {
  await mongoose.connection.close();
};

export default {
  connect,
  close,
};
