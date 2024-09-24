// const User = require('../../models/user')
const profile = require('../../models/user')
const { handleError } = require('../../middleware/utils')
const path = require('path')
const { sendEmail } = require('../../middleware/emailer')

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const blockUser = async (req, res) => {
    try {
        // const data = await profile.findOne({ _id: req.body.user_id })
        // if (data.block_user === req.body.status) {
        //     res.status(404).json({
        //         success: false,
        //         result: null,
        //         message: 'uSER ALREADY BLOCKED OR UNBLOCKED'
        //     })
        // } else {
        //     const response = await profile.findOneAndUpdate(
        //         { _id: req.body.user_id },
        //         { block_user: req.body.status }
        //     )
        //     res.status(200).json({
        //         success: true,
        //         result: null,
        //         message: 'BLOCKED STATUS UPDATE SUCCESSFULLY'
        //     })
        // }

        const filedata = path.join(__dirname, '../../../views/kyc.ejs')

        ejs.renderFile(
            filedata,
            { username: "ramesh" },
            async (err, str) => {
                if (err) {
                    console.log(err, 'error')
                    return err
                } else {
                    console.log('mail')
                    const data = {
                        user: {
                            name: "ramesh",
                            email: "ramesh.alpharive@gmail.com"
                        },
                        subject: "block User",
                        htmlMessage: str
                    }

                    sendEmail()
                    console.log(mailSent, 'jkj')
                }
            }
        )
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { blockUser }
