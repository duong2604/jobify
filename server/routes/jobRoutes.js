import { Router } from "express";
import {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} from "../controllers/jobControllers.js";

const router = Router();

router.get("/jobs", getAllJobs);
router.post("/jobs", createJob);
router.get("/jobs/:id", getJob);
router.patch("/jobs/:id", updateJob);
router.delete("/jobs/:id", deleteJob);

// router.route("/jobs").get(getAllJobs).post(createJob);
// router.route("/jobs/:id").get(getJob).patch(updateJob).delete(deleteJob);

export default router;
