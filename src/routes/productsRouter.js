/* const { Router } = require('express')

const ProductController = require('./controllers/productsController')

const productRouter = Router()

productRouter.get('/', ProductController.getProducts)

module.exports = productRouter */

const express = require('express')
const router = new express.Router()

const ProductController = require('./controllers/productsController')

router.get('/', ProductController.getProducts)

module.exports = router
