import mongoose, { mongo } from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      require: true,
    },
    position: {
      type: String,
      require: true,
    },
    jobStatus: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "internship"],
      default: "full-time",
    },
    jobLocation: {
      type: String,
      default: "Ha Noi",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Job", jobSchema);
