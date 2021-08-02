const {
  login,
  registration,
  logout,
  getCurrentUser,
} = require('../services/user')

const registrationController = async (req, res, next) => {
  const { email, password, height, name, currentWeight, desiredWeight, bloodType, age } = req.body
  const user = await registration({ email, password, height, name, currentWeight, desiredWeight, bloodType, age })
  res.status(201).json({
    user
  })
}

const loginController = async (req, res, next) => {
  const { email, password } = req.body
  const user = await login({ email, password })
  return res.status(200).json({ user })
}
const logoutController = async (req, res) => {
  const { id } = req.user
  const token = req.token
  await logout({
    id, token
  })

  res.status(204).json()
}
const getCurrentUserController = async (req, res, next) => {
  const token = req.token
  const { _id: id } = req.user
  const user = await getCurrentUser({ id, token })
  return res.status(200).json({ user })
}

module.exports = {
  registrationController,
  loginController,
  logoutController,
  getCurrentUserController,
}
