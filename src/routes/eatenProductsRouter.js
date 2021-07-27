const express = require('express')
const router = express.Router()

const { asyncWrapper } = require('../helpers/apiHelpers')
const { authMiddleware } = require('../middlewares/authMiddleware')

const { addEatenProductController, deleteEatenProductController, getEatenProductsListController } = require('../controllers/eatenProductsController')

const {
  validationAddEatenProduct,
  validationDeleteEatenProduct,
  validationGetEatenProducts,
} = require('../middlewares/validationEatenProdacts')

/// ////////добавить прослойку на проверку аутентификации!
// const { authMiddleware } = require("../../middlewares/authMiddleware")
// router.use(authMiddleware)

// validationCreateProduct//
// Сделать проверку валидации на введенные данные!

router.post('/', authMiddleware, validationAddEatenProduct, asyncWrapper(addEatenProductController))
router.delete('/', authMiddleware, validationDeleteEatenProduct, asyncWrapper(deleteEatenProductController))
router.get('/:date', authMiddleware, validationGetEatenProducts, asyncWrapper(getEatenProductsListController))

module.exports = router
