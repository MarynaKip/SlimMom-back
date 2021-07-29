const express = require('express')
const logger = require('morgan')
require('dotenv').config()

const app = express()

const eatenProductsRouter = require('./src/routes/eatenProductsRouter')
<<<<<<< HEAD
const { errorHandler } = require('./src/helpers/apiHelpers')

// const { productsRouter } = require('./src/routes/productsRouter')
=======
const productsRouter = require('./src/routes/productsRouter')
>>>>>>> dev
const userRouter = require('./src/routes/usersRouter')
const dailyRouter = require('./src/routes/dailyNormRoute')

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(express.json())

app.use('/api/products', productsRouter)
app.use('/api/user', userRouter)
app.use('/api/daily', dailyRouter)
app.use('/api/eaten_products', eatenProductsRouter)

app.use(errorHandler)

module.exports = app
