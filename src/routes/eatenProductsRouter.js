const express = require('express')
const router = express.Router()

const { asyncWrapper } = require('../helpers/apiHelpers')
const { authMiddleware } = require('../middlewares/authMiddleware')

const { addEatenProductController, deleteEatenProductController, getEatenProductsListController } = require('../controllers/eatenProductsController')

const {
  validationAddEatenProduct,
  validationDeleteEatenProduct,
  validationGetEatenProducts,
} = require('../middlewares/validationEatenProducts')

router.use(authMiddleware)
router.post('/', validationAddEatenProduct, asyncWrapper(addEatenProductController))
router.delete('/', validationDeleteEatenProduct, asyncWrapper(deleteEatenProductController))
router.get('/:date', validationGetEatenProducts, asyncWrapper(getEatenProductsListController))

module.exports = router
