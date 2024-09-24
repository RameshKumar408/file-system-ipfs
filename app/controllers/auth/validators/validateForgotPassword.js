const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates forgot password request
 */
const validateForgotPassword = [
  check('deviceid')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('password')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isLength({
      min: 3
    }),
  check('phrase')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateForgotPassword }
