const express = require('express')
const router = express.Router()
require('../../config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')

const {
  register,
  getRefreshToken,
  login,
  loginByAdmin,
  roleAuthorization,
  profile,
  profileUpdate,
} = require('../controllers/auth')

const {
  validateRegister,
  validateLogin,
  adminvalidateLogin,
  validateprofile,
} = require('../controllers/auth/validators')

/*
 * Auth routes
 */

/*
 * Register route
 */
router.post('/register', trimRequest.all, validateRegister, register)

/*
 * Get new refresh token
 */
router.get(
  '/token',
  requireAuth,
  roleAuthorization(['user', 'admin']),
  trimRequest.all,
  getRefreshToken
)

/*
 * Login route
 */
router.post('/login', trimRequest.all, validateLogin, login)

router.post('/adminlogin', trimRequest.all, adminvalidateLogin, loginByAdmin)

router.get(
  '/profile',
  trimRequest.all,
  profile
)

module.exports = router
