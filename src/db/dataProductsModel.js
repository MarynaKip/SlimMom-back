const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
  _id: {
    type: Object,
  },
  categories: {
    type: Array,
  },
  weight: {
    type: Number,
  },
  title: {
    type: mongoose.Schema.Types.Mixed,
  },
  calories: {
    type: Number,
  },
  groupBloodNotAllowed: {
    1: { type: Boolean, required: true },
    2: { type: Boolean, required: true },
    3: { type: Boolean, required: true },
    4: { type: Boolean, required: true },
  },
})

const Data = mongoose.model('Data', dataSchema)

module.exports = { Data }
