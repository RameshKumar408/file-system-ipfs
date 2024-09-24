const { handleError } = require('../../middleware/utils')
const axios = require('axios')
/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createAddress = async () => {
    try {
        const createwallet = await axios.post(
            'https://api.blockcypher.com/v1/eth/main/addrs'
        )
        return createwallet
    } catch (error) {
        handleError(res, error)
    }
}
module.exports = { createAddress }
