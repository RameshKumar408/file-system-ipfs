/* eslint-disable max-statements */
const { matchedData } = require('express-validator')

const { handleError } = require('../../middleware/utils')
const profile = require('../../models/profile')
const { getItems, checkQueryString } = require('../../middleware/db')
const { listInitOptions } = require('../../middleware/db/listInitOptions')

/**
 * Login function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const individualKyc = async (req, res) => {
    try {
        const response = await profile.findOne({ userid: req.body.userid }).populate(["userid"])
        if (response) {
            res.status(200).json({
                success: true,
                result: response,
                message: 'USERS KYC DETAILS FETCHED SUCCESSFULLY'
            })
        } else {
            res.status(404).json({
                success: false,
                result: null,
                message: 'USERS KYC DETAILS NOT FOUND'
            })
        }

    } catch (error) {
        handleError(res, error)
    }
}
module.exports = { individualKyc }
