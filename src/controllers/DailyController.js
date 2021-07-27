const {
  dailyNorm
} = require('../services/daily')

const dailyNormController = async (req, res, next) => {
  const { currentWeight, height, age, desiredWeight, bloodType } = req.body
  const dailyMeal = await dailyNorm({ currentWeight, height, age, desiredWeight, bloodType })
  res.status(201).json({ dailyMeal })
}

module.exports = {
  dailyNormController
}
