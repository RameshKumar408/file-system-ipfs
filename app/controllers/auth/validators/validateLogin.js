const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates register request
 */
/**
 * Validates login request
 */
const validateLogin = [
  check('deviceid')
    .exists()
    .withMessage('deviceid MISSING')
    .not()
    .isEmpty()
    .withMessage('Please Enter Device ID'),
  check('password')
    .exists()
    .withMessage('password MISSING')
    .not()
    .isEmpty()
    .withMessage('Please Enter Password'),
  check('check')
    .exists()
    .withMessage('check MISSING')
    .not()
    .isEmpty()
    .withMessage('Please Enter Check'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateLogin }
