const {
  getQueryMatchedProductListService
} = require('../services/productsService')

const getQueryMatchedProductListController =
  async (req, res) => {
    const { input } = req.query

    const data = await getQueryMatchedProductListService(input)

    return res.status(200).json({ data })
  }

module.exports = {
  getQueryMatchedProductListController,
}
