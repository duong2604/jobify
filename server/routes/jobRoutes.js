import { Router } from "express";
import {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} from "../controllers/jobControllers.js";

const router = Router();

router.get("/", getAllJobs);
router.post("/", createJob);
router.get("/:id", getJob);
router.patch("/:id", updateJob);
router.delete("/:id", deleteJob);

// router.route("/").get(getAllJobs).post(createJob);
// router.route("/:id").get(getJob).patch(updateJob).delete(deleteJob);

export default router;
