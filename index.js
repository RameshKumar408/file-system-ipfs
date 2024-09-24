const { validateForgotPassword } = require('./validateForgotPassword')
const { validateLogin } = require('./validateLogin')
const { validateRegister } = require('./validateRegister')
const { validateResetPassword } = require('./validateResetPassword')
const { validateVerify } = require('./validateVerify')
const { adminvalidateLogin } = require('./adminvalidateLogin')
const { validateprofile } = require('./profilevalidae')
const { Bvalidateprofile } = require('./Bprofilevalidator')

module.exports = {
  validateForgotPassword,
  validateLogin,
  validateRegister,
  validateResetPassword,
  validateVerify,
  adminvalidateLogin,
  validateprofile,
  Bvalidateprofile
}
