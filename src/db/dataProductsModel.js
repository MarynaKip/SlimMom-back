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
    type: Object,
  },
  calories: {
    type: Number,
  },
  groupBloodNotAllowed: {
    type: Array,
  },
})

const Data = mongoose.model('Data', dataSchema)

module.exports = { Data }
