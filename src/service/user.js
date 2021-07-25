const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
//  const path = require('path')
// const fs = require('fs').promises

const { User } = require('../db/userModel')
const { NotAuthorized, RegistrationConflictError } = require('../helpers/errors')
// { email, password, height, currentWeight, desiredWeight, bloodType, name }
const login = async ({ email, password }) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new NotAuthorized('Email  is wrong')
  }
  if (!await bcrypt.compare(password, user.password)) {
    throw new NotAuthorized('Password is wrong')
  }
  const token = jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET
  )
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { $set: { token } },
    { new: true }
  )
  return updatedUser
}

const registration = async ({ email, password, height, currentWeight, desiredWeight, bloodType, name }) => {
  const existEmail = await User.findOne({ email })
  if (existEmail) { throw new RegistrationConflictError('Email  is already used') }
 const user = new User({ email, password, height, currentWeight, desiredWeight, bloodType, name })
  await user.save()
  return login({ email, password })
}
const logout = async ({ userId, token }) => {
  const logoutUser = await User.findOneAndUpdate(
    { _id: userId, token },
    { $set: { token: null } },
    { new: true }
  )
  if (!logoutUser) {
    throw new NotAuthorized('Not authorized')
  }
}
const getCurrentUser = async ({ userId, token }) => {
  const currentUser = await User.findOne(
    { _id: userId, token },
  )
  return currentUser
}

module.exports = {
  registration,
  login,
  logout,
  getCurrentUser,
}
