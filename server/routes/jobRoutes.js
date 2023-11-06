import { Router } from "express";
import {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} from "../controllers/jobControllers.js";
import {
  validateJobInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";

const router = Router();

router.get("/", getAllJobs);
router.post("/", validateJobInput, createJob);
router.get("/:id", validateIdParam, getJob);
router.patch("/:id", validateIdParam, validateJobInput, updateJob);
router.delete("/:id", validateIdParam, deleteJob);

// router.route("/").get(getAllJobs).post(createJob);
// router.route("/:id").get(getJob).patch(updateJob).delete(deleteJob);

export default router;
