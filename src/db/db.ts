import mongoose, { Connection, Mongoose, MongooseOptions } from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

export const connection = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGO_URI as string).then(() => {
      console.log("Connected to MongoDB");
    });
  } catch (error) {
    console.log(error);
  }
};

export const disconnect = async () => {
  try {
    mongoose.disconnect(() => {
      console.log("Connection closed");
    });
  } catch (error) {
    console.log(error);
  }
};
