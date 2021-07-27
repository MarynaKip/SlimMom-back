const {
  addEatenProductService,
  deleteEatenProductService,
  getEatenProductsListService,
} = require('../services/eatenProductsService')

const addEatenProductController = async (req, res) => {
  const data = await addEatenProductService(req.user._id, req.body)
  // заглушка на юзера!!! userId = req.user._id

  return res.status(200).json({ data, status: 'success' })
}

const deleteEatenProductController = async (req, res) => {
  const product = await deleteEatenProductService(req.user._id, req.body)

  if (!product) {
    return res.status(404).json({ message: 'Not found' })
  }
  return res.status(200).json({ status: 'success' })
}

const getEatenProductsListController = async (req, res) => {
  const data = await getEatenProductsListService(req.user._id, req.params)

  if (!data) {
    // Нет информации на эту дату....
  }

  return res.status(200).json({ data, status: 'success' })
}

module.exports = {
  addEatenProductController,
  deleteEatenProductController,
  getEatenProductsListController,
}
