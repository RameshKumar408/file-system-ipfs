/* eslint-disable max-statements */
const { matchedData } = require('express-validator')

const { handleError } = require('../../middleware/utils')
const { createItem } = require('../../middleware/db')
const userProfile = require('../../models/user')

/**
 * Login function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const profileUpdate = async (req, res) => {
    try {
        const datas = await userProfile.findOneAndUpdate({ _id: req.user._id }, req.body)
        res.status(200).json({
            success: true,
            result: req.body,
            message: 'Profile Update Successfully'
        })
    } catch (error) {
        handleError(res, error)
    }
}
module.exports = { profileUpdate }
