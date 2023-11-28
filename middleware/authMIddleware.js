import { UnathorizedError, UnauthenticatedError, BadRequestError } from '../errors/customErrors.js'
import { verifyJTW } from '../utils/tokenUtils.js'

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies

  if (!token) throw new UnauthenticatedError('authentication invalid')
  try {
    const { userId, role } = verifyJTW(token)
    const testUser = userId === '6565d7e9a32a1c93ca28442f'
    req.user = { userId, role, testUser }

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

export const checkForTestUser = (req, res, next) => {
  if (req.user.testUser) throw new BadRequestError('Demo user. read only')

  next()
}
