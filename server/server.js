import "express-async-errors";
import express from "express";
const app = express();
import * as dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import db from "./db/mongoose.js";
import cookieParser from "cookie-parser";

// middleware
import errorHandlerMiddleware from "./middleware/errorHandleMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

// routes
import jobRoutes from "./routes/jobRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRouter from "./routes/userRouter.js";

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(cookieParser());

app.get("/api/v1/test", (req, res) => {
  res.json("test api");
});

app.use("/api/v1/jobs", authenticateUser, jobRoutes);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/auth", authRoutes);

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
