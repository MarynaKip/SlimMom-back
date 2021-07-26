const productModel = require('./db/productModel')

module.exports = class ProductService {
  static async getProducts(search) {
    try {
      const products = await productModel.find()

      return products.filter(({ title }) =>
        title.ru.toLowerCase().includes(search.toLowerCase()),
      )
    } catch (error) {
      console.log(error)
    }
  }
}
