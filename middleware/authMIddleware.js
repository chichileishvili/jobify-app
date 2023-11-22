import { UnathorizedError, UnauthenticatedError } from '../errors/customErrors.js'
import { verifyJTW } from '../utils/tokenUtils.js'

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies

  if (!token) throw new UnauthenticatedError('authentication invalid')
  try {
    const { userId, role } = verifyJTW(token)
    req.user = { userId, role }

    next()
  } catch (error) {
    throw new UnauthenticatedError('authentication invalid')
  }
}

export const authorizedPermisions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnathorizedError('unathroized to acces this route')
    }

    next()
  }
}
