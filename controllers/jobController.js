import { nanoid } from 'nanoid'
import Job from '../models/jobModel.js'

let jobs = [
  { id: nanoid(), company: 'apple', position: 'front-end' },
  { id: nanoid(), company: 'google', position: 'back-end' },
]

export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({})
  res.status(200).json({ jobs })
}

export const createJob = async (req, res) => {
  const job = await Job.create(req.body)
  res.status(201).json({ job })
}

export const getJob = async (req, res) => {
  const { id } = req.params
  const job = await Job.findById(id)

  if (!job) {
    return res.status(404).json({ msg: `there is no job with this id ${id}` })
  }
  res.status(200).json({ job })
}

export const updateJob = async (req, res) => {
  const { company, position } = req.body
  if (!company || !position) {
    return res.status(400).json({ msg: 'please provide company and position' })
  }
  const { id } = req.params
  const job = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
  })
  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` })
  }

  res.status(200).json({ msg: 'job has modified', job })
}

export const deleteJob = async (req, res) => {
  const { id } = req.params
  const removedJob = await Job.findByIdAndDelete(id)
  if (!removedJob) {
    return res.status(404).json({ msg: `no job with id ${id}` })
  }

  res.status(200).json({ msg: 'job deleted' })
}
