const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
 const {
  privatDailyNorm
} = require('../services/daily')

const { User } = require('../db/userModel')
const { NotAuthorized, RegistrationConflictError } = require('../helpers/errors')

const login = async ({ email, password }) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new NotAuthorized('Wrong credentials')
  }
  if (!await bcrypt.compare(password, user.password)) {
    throw new NotAuthorized('Wrong credentials')
  }
  const token = jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET
  )
  await privatDailyNorm({ id: user._id, token: user.token, currentWeight: user.currentWeight, height: user.height, age: user.age, desiredWeight: user.desiredWeight, bloodType: user.bloodType})
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { $set: { token } },
    { new: true },
  ).select({ __v: 0, password: 0 })
  return updatedUser
}

const registration = async ({ email, password, height, name, currentWeight, desiredWeight, bloodType, age }) => {
  const existEmail = await User.findOne({ email })
  if (existEmail) { throw new RegistrationConflictError('Email is already used') }
  const user = new User({ email, password, height, name, currentWeight, desiredWeight, bloodType, age })
  await user.save()
  return await login({ email, password })
}
const logout = async ({ id, token }) => {
  const logoutUser = await User.findOneAndUpdate(
    { _id: id, token },
    { $set: { token: null } },
    { new: true }
  )
  if (!logoutUser) {
    throw new NotAuthorized('Not authorized')
  }
}
const getCurrentUser = async ({ id, token }) => {
  const currentUser = await User.findOne({ _id: id, token }).select({
    __v: 0,
    password: 0,
  })
  return currentUser
}

module.exports = {
  registration,
  login,
  logout,
  getCurrentUser
}
