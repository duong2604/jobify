import { StatusCodes } from "http-status-codes";
import Job from "../models/job.js";
import { NotFoundError } from "../errors/customErrors.js";

// Get all jobs
export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({});
  res.status(StatusCodes.OK).json({ jobs });
};

// Get a job
export const getJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    throw new NotFoundError(`no job with id ${id}`);
  }
  return res.status(StatusCodes.OK).json({ job });
};

// create a job
export const createJob = async (req, res) => {
  const job = await Job.create(req.body);
  return res.status(StatusCodes.CREATED).json({ job });
};
// Update a job
export const updateJob = async (req, res) => {
  const { id } = req.params;
  const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedJob) {
    throw new NotFoundError(`no job with id : ${id}`);
  }
  res.status(StatusCodes.OK).json({ msg: "job modified.", data: updatedJob });
};

// Delete a job

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findByIdAndDelete(id);
  if (!job) {
    return res.status(404).json({
      msg: "Job not found.",
    });
  }
  res.status(StatusCodes.OK).json({ msg: `Deleted job with id ${id}` });
};
