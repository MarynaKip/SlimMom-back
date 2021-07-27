const Joi = require('joi')

const checkValidation = (schema, req, res, next) => {
  const validationResult = schema.validate(req.body)
  if (validationResult.error) {
    return res.status(400).json({ status: validationResult.error.message })
  }
  next()
}

const authorInfoValidation = (req, res, next) => {
  const schema = Joi.object({
    height: Joi.string().min(3).max(4).required(),
    currentWeight: Joi.string().min(2).max(3).required(),
    desiredWeight: Joi.string().min(2).max(3).required(),
    bloodType: Joi.string().min(1).max(1).required(),
    age: Joi.string().min(1).max(3).required(),
  })
  checkValidation(schema, req, res, next)
}
const registrationValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(3).max(30).required(),
    password: Joi.string().min(3).max(30).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2
      })
      .required(),
  })
  checkValidation(schema, req, res, next)
}
const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    password: Joi.string().min(3).max(30).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2
      })
      .required()
  })
  checkValidation(schema, req, res, next)
}
module.exports = { registrationValidation, loginValidation, authorInfoValidation }
