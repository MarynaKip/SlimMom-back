const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, 'productName is required'],
  },
  date: {
    type: String,
    required: [true, 'Date is required'],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Users',
  },
  productWeight: {
    type: String,
  },
  productKkal: {
    type: String,
  },
})

const EatenProducts = mongoose.model('Product', productSchema)

module.exports = { EatenProducts }
