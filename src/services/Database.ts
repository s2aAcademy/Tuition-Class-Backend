import mongoose from "mongoose";
import { MONGO_URI } from "../config";

const dbConnection = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = {
  dbConnection,
};
