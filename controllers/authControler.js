import { StatusCodes } from 'http-status-codes'
import User from '../models/userModel.js'
import { hashedPassword, comparePasswords } from '../utils/passwordUtils.js'
import { UnauthenticatedError } from '../errors/customErrors.js'
import { createJWT } from '../utils/tokenUtils.js'

export const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0
  req.body.role = isFirstAccount ? 'admin' : 'user'
  const hashePassword = await hashedPassword(req.body.password)
  req.body.password = hashePassword
  const user = await User.create(req.body)

  res.status(StatusCodes.CREATED).json({ msg: 'user Created' })
}

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  const isValidUser = user && (await comparePasswords(req.body.password, user.password))
  if (!isValidUser) throw new UnauthenticatedError('invalid credentials')
  const token = createJWT({ userId: user._id, role: user.role })
  const ondeDay = 1000 * 60 * 60 * 24
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + ondeDay),
    secure: process.env.NODE_ENV === 'production',
  })
  res.status(StatusCodes.OK).json({ msg: 'user logged in' })
}

export const logout = (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  })
  res.status(StatusCodes.OK).json({ msg: 'userLogedout' })
}
