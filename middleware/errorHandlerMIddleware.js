import { StatusCodes } from 'http-status-codes'

const errorHandlerMiddlware = (err, req, res, next) => {
  console.log(err)
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
  const message = err.message || 'somthing went wrong,try again later'
  res.status(statusCode).json({ msg: message })
}

export default errorHandlerMiddlware
