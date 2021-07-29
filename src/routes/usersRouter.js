const express = require('express')
const router = express.Router()
const {
  registrationValidation,
  loginValidation
} = require('../middlewares/vallidation')
const { asyncWrapper } = require('../helpers/apiHelpers')
const { authMiddleware } = require('../middlewares/authMiddleware')

const {
  registrationController,
  loginController,
  logoutController,
  getCurrentUserController,
} = require('../controllers/userController')

router.post('/registration', registrationValidation, asyncWrapper(registrationController))
router.post('/login', loginValidation, asyncWrapper(loginController))
router.post('/logout', authMiddleware, asyncWrapper(logoutController))
router.get('/current', authMiddleware, asyncWrapper(getCurrentUserController))

module.exports = router
