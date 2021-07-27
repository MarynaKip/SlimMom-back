
// const { User } = require('../db/userModel')
const { Data } = require('../db/dataProductsModel')
const { NotAuthorized } = require('../helpers/errors')
// const dailyNorm = async ({ currentWeight, desiredWeight, height, age, bloodType }, groupBloodNotAllowed, title) => {
//   // const calc = 10 * currentWeight + 6.25 * height - 5 * age - 161 - 10 * (currentWeight - desiredWeight)
//   const productNotAllowed = Data.find({groupBloodNotAllowed[bloodType] === true})
//   if (!productNotAllowed) {
//     throw new NotAuthorized('Product is wrong')
//   }
//   const user = new Data(title.ru)
//   await user.save()
//   return user
// }
const dailyNorm = async ({ currentWeight, height, age, desiredWeight, bloodType }) => {
  console.log('bloodType', Number(bloodType))
  // const groupBloodNotAllowed = [
  //   null,
  //   false,
  //   false,
  //   false,
  //   false
  // ]
  // groupBloodNotAllowed[bloodType] = true
  // console.log('groupBloodNotAllowed', { groupBloodNotAllowed })
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
