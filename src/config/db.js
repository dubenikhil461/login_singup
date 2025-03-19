import mongoose from "mongoose";
import dotenv from "dotenv";
import { DB_NAME } from "../constant.js";

dotenv.config({ path: ".env" });

const connectDB = async () => {
  try {
   const conn = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
    console.log(`MongoDB connected ! , host ${conn.connection.host}`);
  } catch (error) {
    console.log(`connection error ${error}`);
    process.exit(1)
  }
};
export default connectDB;
