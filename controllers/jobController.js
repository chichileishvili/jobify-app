import Job from '../models/jobModel.js'
import { StatusCodes } from 'http-status-codes'
import mongoose, { Mongoose } from 'mongoose'
import dayjs from 'dayjs'

export const getAllJobs = async (req, res) => {
  const { search, jobStatus, job, sort } = req.query
  const queryObject = {
    createdBy: req.user.userId,
  }
  if (search) {
    queryObject.$or = [
      { position: { $regex: search, $options: 'i' } },
      { company: { $regex: search, $options: 'i' } },
    ]
  }

  if (jobStatus && jobStatus !== 'all') {
    queryObject.jobStatus = jobStatus
  }
  if (job && job !== 'all') {
    queryObject.job = job
  }

  const sortOptions = {
    newest: '-createdAt',
    oldest: 'createdAt',
    'a-z': 'position',
    'z-a': '-position',
  }
  const sortKey = sortOptions[sort] || sortOptions.newest

  //pagination
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

  const jobs = await Job.find(queryObject).sort(sortKey).skip(skip).limit(limit)
  const totalJobs = await Job.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalJobs / limit)

  res.status(StatusCodes.OK).json({ totalJobs, numOfPages, currentPage: page, jobs })
}

export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({ job })
}

export const getJob = async (req, res) => {
  const { id } = req.params
  const job = await Job.findById(id)

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

  res.status(StatusCodes.OK).json({ msg: 'job has modified', job })
}

export const deleteJob = async (req, res) => {
  const { id } = req.params
  const removedJob = await Job.findByIdAndDelete(id)

  res.status(StatusCodes.OK).json({ msg: 'job deleted' })
}

export const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$jobStatus', count: { $sum: 1 } } },
  ])

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr

    acc[title] = count
    return acc
  }, {})

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  }

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },

    {
      $project: {
        year: { $year: '$createdAt' },
        month: { $month: '$createdAt' },
      },
    },

    {
      $group: {
        _id: { year: '$year', month: '$month' },
        count: { $sum: 1 },
      },
    },

    {
      $sort: { '_id.year': -1, '_id.month': -1 },
    },
    { $limit: 6 },
  ])

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item
      const date = dayjs()
        .month(month - 1)
        .year(year)
        .format('MMM YY')

      return { date, count }
    })
    .reverse()

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications })
}
