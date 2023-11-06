import "express-async-errors";
import express from "express";
const app = express();
import * as dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import db from "./db/mongoose.js";
import errorHandlerMiddleware from "./middleware/errorHandleMiddleware.js";
import jobRoutes from "./routes/jobRoutes.js";

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

// routes
app.use("/api/v1/jobs", jobRoutes);

// middleware
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
