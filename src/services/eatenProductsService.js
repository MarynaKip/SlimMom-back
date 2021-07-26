
const { Product } = require('../db/productModel')
const { Data } = require('../db/dataProductsModel')

const addEatenProductService = async (userId, body) => {
  // Chenge to =>
  // const userId = req.user.id
  const { date, productWeight, productName } = body

  if (!isToday(date)) {
    return null
    // выдать ошибку
  }

  const product = await Product.findOne({ userId, date, productName })

  if (!product) {
    console.log(product)
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

const deleteEatenProductService = async (userId, body) => {
  const { date, productName } = body

  if (!isToday(date)) {
    return null
    // выдать ошибку
  }

  const product = await Product.findOneAndRemove({ userId, date, productName })

  return product
}

const getEatenProductsListService = async (userId, date) => {
  const productList = await Product.find({ userId, date }).select({ __v: 0 })

  return productList
}

const countKkal = async (productName, productWeight) => {
  const product = await Data.findOne({
    title: {
      ru: 'Котлеты из говядины Мираторг Black Angus',
      ua: 'Котлети з яловичини Міраторг Black Angus',
    },
  })
  // Нужно найти решение по поиску товара или работать с айдишниками!!!!!!!!
  const { calories, weight } = product
  const productKkal = Math.round((calories / weight) * productWeight)

  // const data = await fs.readFile(productsPath)
  // const productsList = JSON.parse(data)
  // const product = productsList.find(item => item._id.$oid === productId)
  // const productKkal = Math.round((product.calories / product.weight) * weight)
  // const pro = await Product.findOne({ date: '2021-08-07' })

  return productKkal
}

const isToday = (date) => {
  const inputDay = new Date(date).setHours(0, 0, 0, 0)
  const today = new Date().setHours(0, 0, 0, 0)

  return inputDay === today
}

module.exports = {
  addEatenProductService,
  deleteEatenProductService,
  getEatenProductsListService,
}
