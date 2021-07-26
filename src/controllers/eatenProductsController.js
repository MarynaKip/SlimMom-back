const { addEatenProductService, deleteEatenProductService, getEatenProductsListService } = require('../services/eatenProductsService')

const addEatenProductController = async (req, res) => {
  const data = await addEatenProductService(
    '60dd7ba58680b5629c111111',
    req.body,
  )
  // заглушка на юзера!!! userId = req.user._id

  return res.status(200).json({ data, status: 'success' })
}

const deleteEatenProductController = async (req, res) => {
  const product = await deleteEatenProductService(
    '60dd7ba58680b5629c111111',
    req.body,
  )
  // заглушка на юзера!!! userId = req.user._id

  if (!product) {
    return res.status(404).json({ message: 'Not found' })
  }
  return res.status(200).json({ status: 'success' })
}

const getEatenProductsListController = async (req, res) => {
  const { date } = req.params

  // заглушка на юзера!!! userId = req.user._id
  const data = await getEatenProductsListService(
    '60dd7ba58680b5629c111111',
    date,
  )

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
