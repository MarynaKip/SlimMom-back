const {
    getQueryMatchedProductListService
} = require('../services/productsService')

const getQueryMatchedProductListController
    = async (req, res) => {
        const { input } = req.query

        const data = await getQueryMatchedProductListService(input)
        // заглушка на юзера!!! userId = req.user._id

        return res.status(200).json({ data, status: 'success' })
    }

module.exports = {
    getQueryMatchedProductListController,
}
