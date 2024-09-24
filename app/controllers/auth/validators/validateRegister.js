const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates register request
 */
const validateRegister = [
  check('deviceid')
    .exists()
    .withMessage('DEVICEID MISSING')
    .not()
    .isEmpty()
    .withMessage('please fill deviceid')
    .isLength({ min: 5 })
    .withMessage('must be at least 5 chars long'),
  check('password')
    .exists()
    .withMessage('PASSWORD MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isLength({
      min: 3
    })
    .withMessage('PASSWORD_TOO_SHORT_MIN_5'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateRegister }
