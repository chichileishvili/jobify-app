import 'express-async-errors'
import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import mongoose from 'mongoose'
const app = express()
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
//routers
import jobRouter from './routes/jobRouter.js'
import userRouter from './routes/userRouter.js'
import authRouter from './routes/authRouter.js'

//middleware
import errorHandlerMiddlware from './middleware/errorHandlerMIddleware.js'
import { authenticateUser } from './middleware/authMIddleware.js'

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(cookieParser())
app.use(express.json())

app.get('/api/v1/test', (req, res) => {
  res.json({ msg: 'test route  ' })
})

app.use('/api/v1/jobs', authenticateUser, jobRouter)
app.use('/api/v1/user', authenticateUser, userRouter)
app.use('/api/v1/auth', authRouter)

app.use('*', (req, res) => {
  res.status(404).json({ msg: 'page not found' })
})

app.use(errorHandlerMiddlware)

const port = process.env.PORT || 5100

try {
  await mongoose.connect(process.env.MONGO_URL)
  app.listen(port, () => {
    console.log(`server running on ${port}`)
  })
} catch (error) {
  console.log(error)
  process.exit(1)
}
