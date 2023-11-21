import 'express-async-errors'
import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import mongoose from 'mongoose'
const app = express()
import morgan from 'morgan'
import { body, validationResult } from 'express-validator'
//routers
import jobRouter from './routes/jobRouter.js'

//middleware
import errorHandlerMiddlware from './middleware/errorHandlerMIddleware.js'

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(express.json())

app.get('/', (req, res) => {
  res.send('hello word')
})

app.use('/api/v1/jobs', jobRouter)

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
