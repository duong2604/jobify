import express from "express";
const app = express();
import * as dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import jobRoutes from "./routes/jobRoutes.js";
import db from "./db/mongoose.js";

// middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
const port = process.env.PORT || 8888;
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("Hello world!");
});
app.use("/api/v1", jobRoutes);

// error middleware
app.use("*", (req, res) => {
  res.status(404).json({ msg: "Not found." });
});
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: "Something went wrong." });
});

// connect to db
try {
  await db();
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
