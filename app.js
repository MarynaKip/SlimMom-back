const express = require('express')
const logger = require('morgan')
require('dotenv').config()
const { errorHandler } = require('./src/helpers/apiHelpers')

const app = express()

const eatenProductsRouter = require('./src/routes/eatenProductsRouter')
const productsRouter = require('./src/routes/productsRouter')
const userRouter = require('./src/routes/usersRouter')
const dailyRouter = require('./src/routes/dailyNormRoute')

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(express.json())

app.use('/api/products', productsRouter)
app.use('/api/user', userRouter)
app.use('/api/daily', dailyRouter)
app.use('/api/eaten_products', eatenProductsRouter)

// app.use((req, res) => {
//   res.status(404).json({ message: 'Not found' })
// })

// app.use((err, req, res, next) => {
//   res.status(500).json({ message: err.message })
// })
app.use(errorHandler)

module.exports = app
