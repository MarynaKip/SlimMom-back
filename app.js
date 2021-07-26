const express = require('express')
const logger = require('morgan')
require('dotenv').config()

const app = express()

const eatenProductsRouter = require('./src/routes/eatenProductsRouter')

// const { productsRouter } = require('./src/routes/productsRouter')
const userRouter = require('./src/routes/usersRouter')

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(express.json())

// app.use('/api/products', productsRouter)
app.use('/api/user', userRouter)

app.use('/app/eaten_products', eatenProductsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
