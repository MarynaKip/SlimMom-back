const Joi = require('joi').extend(require('@joi/date'))
const { ValidationError } = require('../helpers/errors')

const checkValidation = (schema, req, res, next) => {
  const validationResult = schema.validate(req.body)
  if (validationResult.error) {
    next(new ValidationError(validationResult.error.message))
  }
  next()
}

const validationAddEatenProduct = (req, res, next) => {
  const schema = Joi.object({
    productName: Joi.string().required(),
    productWeight: Joi.number().min(5).max(5000).required(),
    date: Joi.date().format('YYYY-MM-DD').required(),
  })
  checkValidation(schema, req, res, next)
}

const validationDeleteEatenProduct = (req, res, next) => {
  const schema = Joi.object({
    productName: Joi.string().required(),
    date: Joi.date().format('YYYY-MM-DD').required(),
  })
  checkValidation(schema, req, res, next)
}

const validationGetEatenProducts = (req, res, next) => {
  const schema = Joi.object({
    date: Joi.date().format('YYYY-MM-DD').required(),
  })
  checkValidation(schema, req, res, next)
}

module.exports = {
  validationAddEatenProduct,
  validationDeleteEatenProduct,
  validationGetEatenProducts,
}
