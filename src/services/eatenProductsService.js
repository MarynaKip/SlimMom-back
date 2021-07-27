const { Product } = require('../db/productModel')
const { Data } = require('../db/dataProductsModel')

const addEatenProductService = async (userId, body) => {
  const { date, productWeight, productName } = body

  if (!isToday(date)) {
    return null
    // выдать ошибку
  }

  const product = await Product.findOne({ userId, date, productName })

  if (!product) {
    const productKkal = await countKkal(productName, productWeight)

    const newProduct = new Product({
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

  const updateProduct = await Product.findOneAndUpdate(
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
  if (!isToday(date)) {
    return null
    // выдать ошибку
  }

  const product = await Product.findOneAndRemove({ userId, date, productName })

  // выдать сообщение, что на эту дату нет никакой информации

  return product
}

const getEatenProductsListService = async (userId, { date }) => {
  const productList = await Product.find({ userId, date }).select({ __v: 0 })

  // выдать ошибку
  if (productList.length === 0) {
    return 'No info for this day'
  }

  return productList
}

const countKkal = async (productName, productWeight) => {
  const product = await Data.findOne({ 'title.ru': productName })
  const { calories, weight } = product
  const productKkal = Math.round((calories / weight) * productWeight)

  return productKkal
}

const isToday = date => {
  const inputDay = new Date(date).setHours(0, 0, 0, 0)
  const today = new Date().setHours(0, 0, 0, 0)

  return inputDay === today
}

module.exports = {
  addEatenProductService,
  deleteEatenProductService,
  getEatenProductsListService,
}
