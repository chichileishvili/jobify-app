import 'express-async-errors'
import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import mongoose from 'mongoose'
const app = express()
import morgan from 'morgan'
//routers
import jobRouter from './routes/jobRouter.js'

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(express.json())

app.get('/', (req, res) => {
  res.send('hello word')
})

app.post('/', (req, res) => {
  console.log(req)
  res.json({ message: 'data recieved ', data: req.body })
})

app.use('/api/v1/jobs', jobRouter)

app.use('*', (req, res) => {
  res.status(404).json({ msg: 'page not found' })
})

app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json({ msg: 'somthing went wrong' })

  next()
})

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
