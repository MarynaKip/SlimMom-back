const { Data } = require('../db/dataProductsModel')

const getQueryMatchedProductListService = async (query) => {
  const productList = await Data.find({ 'title.ru': /Гр/gi }, { title: 1, _id: 0 })
  // выдать ошибку
  if (productList.length === 0) {
    return 'No matched products'
  }

  return productList
}

module.exports = {
  getQueryMatchedProductListService,
}
