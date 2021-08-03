const {
  dailyNorm,
  privatDailyNorm
} = require('../services/daily')

const dailyNormController = async (req, res, next) => {
  const { currentWeight, height, age, desiredWeight, bloodType } = req.body
  const dailyMeal = await dailyNorm({ currentWeight, height, age, desiredWeight, bloodType })
  res.status(201).json({ dailyMeal })
}

const privatDailyNormController = async (req, res, next) => {
  const { currentWeight, height, age, desiredWeight, bloodType } = req.body
  const token = req.token
  const { _id: id } = req.user
  const user = await privatDailyNorm({ id, token, currentWeight, height, age, desiredWeight, bloodType })
  return res.status(200).json({ user })
}
module.exports = {
  dailyNormController,
  privatDailyNormController
}
