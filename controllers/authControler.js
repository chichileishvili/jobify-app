import { StatusCodes } from 'http-status-codes'
import User from '../models/userModel.js'
import { hashedPassword, comparePasswords } from '../utils/passwordUtils.js'
import { UnauthenticatedError } from '../errors/customErrors.js'

export const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0
  req.body.role = isFirstAccount ? 'admin' : 'user'
  const hashedPassword = await hashedPassword(req.body.password)
  req.body.password = hashedPassword
  const user = await User.create(req.body)

  res.status(StatusCodes.CREATED).json({ msg: 'user Created' })
}

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  const isValidUser = user && (await comparePasswords(req.body.password, user.password))
  if (!isValidUser) throw new UnauthenticatedError('invalid credentials')

  res.send('login')
}
