const { EatenProducts } = require('../db/eatenProductsModel')
const { Data } = require('../db/dataProductsModel')
const { ValidationError, NotFoundError } = require('../helpers/errors')

const addEatenProductService = async (userId, body) => {
  const { date, productWeight, productName } = body

  if (!isCurrentDay(date)) {
    throw new ValidationError('Date must be current')
  }

  const product = await EatenProducts.findOne({ userId, date, productName })

  if (!product) {
    const productKkal = await countKkal(productName, productWeight)

    const newProduct = new EatenProducts({
      date,
      userId,
      productWeight,
      productKkal,
      productName,
    })

    await newProduct.save()

    return newProduct
  }

  const newProductWeight = Number(product.productWeight) + Number(productWeight)

  const productKkal = await countKkal(productName, newProductWeight)

  const updateProduct = await EatenProducts.findOneAndUpdate(
    { _id: product._id },
    {
      productWeight: newProductWeight,
      productKkal: productKkal,
    },
    { new: true },
  ).select({ __v: 0 })

  return updateProduct
}

const deleteEatenProductService = async (userId, { date, productName }) => {
  if (!isCurrentDay(date)) {
    throw new ValidationError('Date must be current')
  }

  const product = await EatenProducts.findOneAndRemove({ userId, date, productName })

  if (!product) {
    throw new NotFoundError('This product is not eaten on the current date')
  }
}

const getEatenProductsListService = async (userId, { date }) => {
  const productList = await EatenProducts.find({ userId, date }).select({ __v: 0 })

  return productList
}

const countKkal = async (productName, productWeight) => {
  const product = await Data.findOne({ 'title.ru': productName })

  if (!product) {
    throw new NotFoundError('Product name is not correct')
  }

  const { calories, weight } = product
  const productKkal = Math.round((calories / weight) * productWeight)

  return productKkal
}

const isCurrentDay = date => {
  const inputDay = new Date(date).setHours(0, 0, 0, 0)
  const today = new Date().setHours(0, 0, 0, 0)

  return inputDay === today
}

module.exports = {
  addEatenProductService,
  deleteEatenProductService,
  getEatenProductsListService,
}


//тестовый коммит для решения конфликтов!
