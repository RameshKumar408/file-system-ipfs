const { matchedData } = require('express-validator')
// const { findUser, saveForgotPassword } = require('./helpers')
const { handleError } = require('../../middleware/utils')
const { decrypt } = require('../../middleware/auth')
const User = require('../../models/user')
const bcrypt = require('bcrypt')
const { checkPassword } = require('../../middleware/auth')

/**
 * Forgot password function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
// eslint-disable-next-line max-statements
const adminForgotPassword = async (req, res) => {
    try {
        // Gets locale from header 'Accept-Language'
        // const locale = req.getLocale()
        const usrpswd = await User.findOne(req.user._id, "password name email role verified")
        console.log(usrpswd, "asdf")
        var oldpass = req.body.oldpassword
        console.log(oldpass)
        const isPasswordMatch = await checkPassword(oldpass, usrpswd)
        if (isPasswordMatch) {
            await User.findOneAndUpdate(
                { _id: req.user._id },
                { password: bcrypt.hashSync(req.body.newpassword, 5) }
            )
            res.status(200).json({
                success: true,
                result: null,
                message: 'PIN UPDATED SUCESSFULLY'
            })
        } else {
            res.status(404).json({
                success: false,
                result: null,
                message: 'INCORRECT PIN'
            })
        }
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { adminForgotPassword }
