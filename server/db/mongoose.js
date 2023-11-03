import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      writeConcern: { w: "majority" },
      maxPoolSize: 10,
      dbName: "jobify",
    });
    console.log("Connected to mongodb.");
  } catch (error) {
    console.log("Failed to connect to mongodb.");
  }
};

export default db;
