const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: [true, 'Name is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  height: {
    type: String,
    // required: [true, 'height is required'],

  },
  currentWeight: {
    type: String,
    // required: [true, 'currentWeight is required'],

  },
  desiredWeight: {
    type: String,
    // required: [true, 'desiredWeight is required'],

  },
  bloodType: {
    type: String,
    // required: [true, 'bloodType is required'],

  },
  dailyRate: {
    type: String,
  },
  token: {
    type: String,
    default: null,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verifyToken: {
    type: String,
  },
})

userSchema.pre('save', async function () {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 10)
  }
})

const User = mongoose.model('user', userSchema)

module.exports = { User }
