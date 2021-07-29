const {
  addEatenProductService,
  deleteEatenProductService,
  getEatenProductsListService,
} = require('../services/eatenProductsService')

const addEatenProductController = async (req, res) => {
  const data = await addEatenProductService(req.user._id, req.body)

  return res.status(200).json({ data, status: 'success' })
}

const deleteEatenProductController = async (req, res) => {
  await deleteEatenProductService(req.user._id, req.body)

  return res.status(200).json({ status: 'success' })
}

const getEatenProductsListController = async (req, res) => {
  const data = await getEatenProductsListService(req.user._id, req.params)

  return res.status(200).json({ data, status: 'success' })
}

module.exports = {
  addEatenProductController,
  deleteEatenProductController,
  getEatenProductsListController,
}
