const express = require('express')
const router = express.Router()
require('../../config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
    session: false
})
const trimRequest = require('trim-request')
const { roleAuthorization } = require('../controllers/auth')

const {
    getUsers,
    blockUser,
    adminForgotPassword
} = require('../controllers/admin')

router.get(
    '/userslist',
    requireAuth,
    roleAuthorization(['admin']),
    trimRequest.all,
    getUsers
)

router.post(
    '/changepassword',
    requireAuth,
    roleAuthorization(['admin']),
    adminForgotPassword
)

router.get('/blockuser', blockUser)

module.exports = router
