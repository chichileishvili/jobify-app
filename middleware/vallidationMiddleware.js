import { body, param, validationResult } from 'express-validator'
import { BadRequestError, NotFoundError, UnathorizedError } from '../errors/customErrors.js'
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js'
import mongoose from 'mongoose'
import Job from '../models/jobModel.js'
import User from '../models/userModel.js'

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const error = validationResult(req)
      if (!error.isEmpty()) {
        const errorMessages = error.array().map((error) => error.msg)
        const error1 = errorMessages[0]
        console.log(error1)
        if (errorMessages[0].startsWith('no job with ')) {
          throw new NotFoundError(errorMessages)
        }
        if (errorMessages[0].startsWith('not authorized')) {
          throw new UnathorizedError('not authorized to acces this route')
        }
        throw new BadRequestError(errorMessages)
      }

      next()
    },
  ]
}
export const validateJobInput = withValidationErrors([
  body('company').notEmpty().withMessage('company is required'),
  body('position').notEmpty().withMessage('position is required'),
  body('jobLocation').notEmpty().withMessage('job location is required'),

  body('jobStatus').isIn(Object.values(JOB_STATUS)).withMessage('Invalid status value'),
  body('job').isIn(Object.values(JOB_TYPE)).withMessage('Invalid type value'),
])

export const validateIdParam = withValidationErrors([
  param('id').custom(async (value, { req }) => {
    const isValidID = mongoose.Types.ObjectId.isValid(value)
    if (!isValidID) throw new BadRequestError('invalid MongoDB id')
    const job = await Job.findById(value)
    if (!job) throw new NotFoundError(`no job with this id ${value}`)
    const isAdmin = req.user.role === 'admin'
    const isOwner = req.user.userId === job.createdBy.toString()
    if (!isAdmin && !isOwner) throw new UnathorizedError('not authorized to acces this route')
  }),
])

export const validateRegister = withValidationErrors([
  body('name').notEmpty().withMessage('name is required'),
  body('lastName').notEmpty().withMessage('lastName is required'),
  body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 8 })
    .withMessage('password must be at least 8 caracters long'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format')
    .custom(async (email) => {
      const user = await User.findOne({ email })
      if (user) {
        throw new BadRequestError('email already exists')
      }
    }),
  body('location').notEmpty().withMessage('location is required'),
])

export const validateLogin = withValidationErrors([
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format'),
  body('password').notEmpty().withMessage('password is required'),
])

export const updateUserInput = withValidationErrors([
  body('name').notEmpty().withMessage('name is required'),
  body('lastName').notEmpty().withMessage('lastName is required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format')
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email })
      if (user && user._id.toString() !== req.user.userId) {
        throw new BadRequestError('email already exists')
      }
    }),
  body('location').notEmpty().withMessage('location is required'),
])
