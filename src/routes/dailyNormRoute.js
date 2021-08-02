const express = require('express')
const router = express.Router()
const {
  authorInfoValidation
} = require('../middlewares/vallidation')
const { asyncWrapper } = require('../helpers/apiHelpers')
const { authMiddleware } = require('../middlewares/authMiddleware')

const {
  dailyNormController,
  privatDailyNormController
} = require('../controllers/DailyController')

router.post('/rate', authorInfoValidation, asyncWrapper(dailyNormController))
router.post('/private_rate', authMiddleware, authorInfoValidation, asyncWrapper(privatDailyNormController))

module.exports = router
