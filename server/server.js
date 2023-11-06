import "express-async-errors";
import express from "express";
const app = express();
import * as dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";

// routes
import jobRoutes from "./routes/jobRoutes.js";
app.use("/api/v1/jobs", jobRoutes);

// db
import db from "./db/mongoose.js";

// middleware
import errorHandlerMiddleware from "./middleware/errorHandleMiddleware.js";

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
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
