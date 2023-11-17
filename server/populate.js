import { readFile } from "fs/promises";
import dotenv from "dotenv";
dotenv.config();

import Job from "./models/job.js";
import User from "./models/user.js";
import db from "./db/mongoose.js";

try {
  await db();

  const user = await User.findOne({ email: "demouser@gmail.com" });
  const jsonJobs = await JSON.parse(
    await readFile(new URL("./utils/mockData.json", import.meta.url))
  );
  const jobs = jsonJobs.map((job) => {
    return { ...job, createdBy: user._id };
  });
  await Job.deleteMany({ createdBy: user._id });
  await Job.create(jobs);
  console.log("Success!!!");
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}
