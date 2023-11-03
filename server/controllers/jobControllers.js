import { nanoid } from "nanoid";

let jobs = [
  { id: nanoid(), company: "samsung", position: "front-end" },
  { id: nanoid(), company: "apple", position: "back-end" },
];
// Get all jobs
export const getAllJobs = async (req, res) => {
  res.status(200).json({ jobs });
};

// Get a job
export const getJob = async (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ msg: "job not found." });
  }
  return res.status(200).json({ job });
};

// create a job
export const createJob = async (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return res
      .status(400)
      .json({ msg: "Please provide company and position." });
  }
  let id = nanoid(10);
  const job = { id, company, position };
  jobs.push(job);
  res.status(201).json({ job });
};
// Update a job
export const updateJob = async (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return res
      .status(400)
      .json({ msg: "Please provide company and position." });
  }
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ msg: "Not found job!" });
  }
  job.company = company;
  job.position = position;
  res.status(200).json({ msg: "job modified.", data: job });
};

// Delete a job

export const deleteJob = async (req, res) => {
  const id = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({
      msg: "Job not found.",
    });
  }
  const newJobs = jobs.filter((job) => job.id != id);
  jobs = newJobs;
  res.status(200).json({ msg: "Deleted job.", data: jobs });
};
