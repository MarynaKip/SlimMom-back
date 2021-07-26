const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, 'productName is required'],
  },
  date: {
    type: String,
    required: [true, 'Date is required'],
    // default: Date.now(),
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

const Product = mongoose.model('Product', productSchema)

module.exports = { Product }
