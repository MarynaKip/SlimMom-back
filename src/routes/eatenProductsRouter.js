const express = require('express')
const router = express.Router()

const { asyncWrapper } = require('../helpers/apiHelpers')

const { addEatenProductController, deleteEatenProductController, getEatenProductsListController } = require('../controllers/eatenProductsController')

/// ////////добавить прослойку на проверку аутентификации!
// const { authMiddleware } = require("../../middlewares/authMiddleware")
// router.use(authMiddleware)

// validationCreateProduct//
// Сделать проверку валидации на введенные данные!

router.post('/', asyncWrapper(addEatenProductController))
router.delete('/', asyncWrapper(deleteEatenProductController))
router.get('/:date', asyncWrapper(getEatenProductsListController))

module.exports = router
