const express = require('express')
const cors = require('cors')
const logger = require('morgan')
require('dotenv').config()
const { errorHandler } = require('./src/helpers/apiHelpers')

const app = express()

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

const eatenProductsRouter = require('./src/routes/eatenProductsRouter')
const productsRouter = require('./src/routes/productsRouter')
const userRouter = require('./src/routes/usersRouter')
const dailyRouter = require('./src/routes/dailyNormRoute')

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(express.json())
app.use(cors())

app.use('/api/products', productsRouter)
app.use('/api/user', userRouter)
app.use('/api/daily', dailyRouter)
app.use('/api/eaten_products', eatenProductsRouter)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(errorHandler)

module.exports = app
