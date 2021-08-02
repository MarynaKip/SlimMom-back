const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
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
  },
  age: {
    type: String,
  },
  currentWeight: {
    type: String,
  },
  desiredWeight: {
    type: String,
  },
  bloodType: {
    type: Number,
  },
  dailyRate: {
    type: String,
  },
  token: {
    type: String,
    default: null,
  },
})

userSchema.pre('save', async function () {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 10)
  }
})

const User = mongoose.model('user', userSchema)

module.exports = { User }
