const express = require('express')
const router = express.Router()
require('../../config/passport')
const passport = require('passport')
const multer = require('multer')
const requireAuth = passport.authenticate('jwt', {
    session: false
})
const trimRequest = require('trim-request')
const { roleAuthorization } = require('../controllers/auth')

const {
    uploadImage,
    getImage
} = require('../controllers/ipfs')

const upload = multer()

router.post(
    '/uploadImage',
    requireAuth,
    roleAuthorization(['user']),
    upload.single('image'),
    trimRequest.all,
    uploadImage
)

router.post(
    '/getImage',
    // requireAuth,
    // roleAuthorization(['admin']),
    trimRequest.all,
    getImage
)

module.exports = router
