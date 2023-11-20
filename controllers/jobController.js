import Job from '../models/jobModel.js'
import { StatusCodes } from 'http-status-codes'
import { NotFoundError } from '../errors/customErrors.js'

export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({})
  res.status(StatusCodes.OK).json({ jobs })
}

export const createJob = async (req, res) => {
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({ job })
}

export const getJob = async (req, res) => {
  const { id } = req.params
  const job = await Job.findById(id)

  if (!job) throw new NotFoundError(`there is no job with this id ${id}`)

  res.status(StatusCodes.OK).json({ job })
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
  if (!job) throw new NotFoundError(`no job with id ${id}`)

  res.status(StatusCodes.OK).json({ msg: 'job has modified', job })
}

export const deleteJob = async (req, res) => {
  const { id } = req.params
  const removedJob = await Job.findByIdAndDelete(id)
  if (!removedJob) throw new NotFoundError(`no job with id ${id}`)

  res.status(StatusCodes.OK).json({ msg: 'job deleted' })
}
