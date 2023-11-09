import { StatusCodes } from "http-status-codes";
import Job from "../models/job.js";

// Get all jobs
export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ jobs });
};

// Get a job
export const getJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  return res.status(StatusCodes.OK).json({ job });
};

// create a job
export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  return res.status(StatusCodes.CREATED).json({ job });
};

// Update a job
export const updateJob = async (req, res) => {
  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(StatusCodes.OK).json({ msg: "job modified.", data: updatedJob });
};

// Delete a job
export const deleteJob = async (req, res) => {
  const job = await Job.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({ msg: `Deleted job with id ${id}` });
};
