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
  const currentUser = await privatDailyNorm({ id, token, currentWeight, height, age, desiredWeight, bloodType })
  return res.status(200).json({ currentUser })

  // const userNorm = await privatDailyNorm({ currentWeight, height, age, desiredWeight, bloodType }, id)
  // return res.status(200).json({ status: 'user norm for authorization user ', userNorm })
}
module.exports = {
  dailyNormController,
  privatDailyNormController
}
