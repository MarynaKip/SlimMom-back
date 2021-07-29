const express = require('express')
const router = express.Router()

const { asyncWrapper } = require('../helpers/apiHelpers')
const { authMiddleware } = require('../middlewares/authMiddleware')

const { getQueryMatchedProductListController } = require('../controllers/productsController')

router.get('/', authMiddleware, asyncWrapper(getQueryMatchedProductListController
))

module.exports = router
