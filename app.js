const express = require('express')
const logger = require('morgan')
require('dotenv').config()

const app = express()

const productsRouter = require('./src/routes/productsRouter')
// const { userRouter } = require('./src/routes/userRouter')

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(express.json())

app.use(productsRouter)
// app.use('/users', userRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
