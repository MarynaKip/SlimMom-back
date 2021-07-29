const { Data } = require('../db/dataProductsModel')
const { User } = require('../db/userModel')

const dailyNorm = async ({ currentWeight, height, age, desiredWeight, bloodType }) => {
  const calc = 10 * Number(currentWeight) + 6.25 * Number(height) - 5 * Number(age) - 161 - 10 * (Number(currentWeight) - Number(desiredWeight))
  const dailyNorm = Math.round(calc)
  switch (Number(bloodType)) {
    case 1: {
      const notAllowedProduct = await Data.find({ 'groupBloodNotAllowed.1': { $eq: true } }).select('categories -_id').distinct('categories')

      return { dailyNorm, notAllowedProduct }
    }
    case 2: {
      const notAllowedProduct = await Data.find({ 'groupBloodNotAllowed.2': { $eq: true } }).select('categories -_id').distinct('categories')

      return { dailyNorm, notAllowedProduct }
    }
    case 3: {
      const notAllowedProduct = await Data.find({ 'groupBloodNotAllowed.3': { $eq: true } }).select('categories -_id').distinct('categories')

      return { dailyNorm, notAllowedProduct }
    }
    case 4: {
      const notAllowedProduct = await Data.find({ 'groupBloodNotAllowed.4': { $eq: true } }).select('categories -_id').distinct('categories')

      return { dailyNorm, notAllowedProduct }
    }
    default:
      return false
  }
}

const privatDailyNorm = async ({ id, token, currentWeight, height, age, desiredWeight, bloodType }) => {
  await User.findByIdAndUpdate(
    { _id: id, token },
    { $set: { currentWeight, age, desiredWeight } },
    { new: true }
  )
  return dailyNorm({ currentWeight, height, age, desiredWeight, bloodType })
}
module.exports = { dailyNorm, privatDailyNorm }
