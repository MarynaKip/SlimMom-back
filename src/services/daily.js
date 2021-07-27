const { Data } = require('../db/dataProductsModel')

const dailyNorm = async ({ currentWeight, height, age, desiredWeight, bloodType }) => {
  const calc = 10 * currentWeight + 6.25 * height - 5 * age - 161 - 10 * (currentWeight - desiredWeight)
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
module.exports = { dailyNorm }
