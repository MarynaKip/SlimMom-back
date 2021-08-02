const Joi = require('joi')
const { ValidationError } = require('../helpers/errors')

const checkValidation = (schema, req, res, next) => {
  const validationResult = schema.validate(req.body)
  if (validationResult.error) {
    next(new ValidationError(validationResult.error.message))
  }
  next()
}

const authorInfoValidation = (req, res, next) => {
  const schema = Joi.object({
    height: Joi.number().min(100).max(250).required(),
    currentWeight: Joi.number().min(30).max(300).required(),
    desiredWeight: Joi.number().min(20).max(300).required(),
    bloodType: Joi.number().integer().min(1).max(4).required(),
    age: Joi.number().integer().min(16).max(120).required(),
  })
  checkValidation(schema, req, res, next)
}
const registrationValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(3).max(30).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
      })
      .required(),
    height: Joi.number().min(90).max(250).optional(),
    currentWeight: Joi.number().min(30).max(300).optional(),
    desiredWeight: Joi.number().min(20).max(300).optional(),
    bloodType: Joi.number().integer().min(1).max(4).optional(),
    age: Joi.number().integer().min(16).max(120).optional(),
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
