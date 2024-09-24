const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates register request
 */
/**
 * Validates login request
 */
const adminvalidateLogin = [
    check('email')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY')
        .isEmail()
        .withMessage('Please Enter Valid Email'),
    check('password')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('Please Enter Password'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { adminvalidateLogin }
