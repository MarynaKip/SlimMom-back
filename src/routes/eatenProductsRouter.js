const express = require('express')
const router = express.Router()

const { asyncWrapper } = require('../helpers/apiHelpers')
const { authMiddleware } = require('../middlewares/authMiddleware')

const { addEatenProductController, deleteEatenProductController, getEatenProductsListController } = require('../controllers/eatenProductsController')

/// ////////добавить прослойку на проверку аутентификации!
// const { authMiddleware } = require("../../middlewares/authMiddleware")
// router.use(authMiddleware)

// validationCreateProduct//
// Сделать проверку валидации на введенные данные!

router.post('/', authMiddleware, asyncWrapper(addEatenProductController))
router.delete('/', authMiddleware, asyncWrapper(deleteEatenProductController))
router.get('/:date', authMiddleware, asyncWrapper(getEatenProductsListController))

module.exports = router
