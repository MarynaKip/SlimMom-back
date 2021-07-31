const { Data } = require('../db/dataProductsModel')

const { NotFoundError } = require('../helpers/errors')

const getQueryMatchedProductListService = async (query) => {
  const reg = new RegExp(query, 'gi')
  const productList = await Data.find({ 'title.ru': reg }, { title: 1, _id: 0 })

  if (productList.length === 0) {
    throw new NotFoundError('No matched products')
  }

  return productList
}

module.exports = {
  getQueryMatchedProductListService,
}
