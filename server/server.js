import "express-async-errors";
import express from "express";
const app = express();
import * as dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import db from "./db/mongoose.js";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";

// middleware
import errorHandlerMiddleware from "./middleware/errorHandleMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

// routes
import jobRoutes from "./routes/jobRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRouter from "./routes/userRouter.js";

// public
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "../", "./client/dist/")));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/jobs", authenticateUser, jobRoutes);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/auth", authRoutes);

app.get(" *", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../", "./client/dist/", "index.html"));
});

app.use("*", (req, res) => {
  res.status(404).json({ msg: "Not found." });
});
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 8888;

try {
  await db();
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
