const {
  addEatenProductService,
  deleteEatenProductService,
  getEatenProductsListService,
} = require('../services/eatenProductsService')

const addEatenProductController = async (req, res) => {
  const data = await addEatenProductService(req.user._id, req.body)

  return res.status(201).json({ data })
}

const deleteEatenProductController = async (req, res) => {
  await deleteEatenProductService(req.user._id, req.body)

  return res.status(204).json()
}

const getEatenProductsListController = async (req, res) => {
  const data = await getEatenProductsListService(req.user._id, req.params)

  return res.status(200).json({ data })
}

module.exports = {
  addEatenProductController,
  deleteEatenProductController,
  getEatenProductsListController,
}
