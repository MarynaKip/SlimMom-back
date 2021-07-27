const {
  login,
  registration,
  logout,
  // getCurrentUser,
} = require('../services/user')

const registrationController = async (req, res, next) => {
  const { email, password, name } = req.body
  const user = await registration({ email, password, name })
  res.status(201).json({
    user
  })
  // json({ status: 'created' })
}

const loginController = async (req, res, next) => {
  const { email, password } = req.body
  const user = await login({ email, password })
  return res.status(200).json({ user })
}
const logoutController = async (req, res) => {
  const { id } = req.user
  // const token = req.token
  await logout({
    id
  })

  res.status(204).json({ status: 'Empty' })
}
// const getCurrentUserController = async (req, res, next) => {
//   const token = req.token
//   const { _id: userId } = req.user
//   const currentUser = await getCurrentUser({ userId, token })
//   return res.status(200).json({ currentUser })
// }

module.exports = {
  registrationController,
  loginController,
  logoutController,
  // getCurrentUserController,
}
