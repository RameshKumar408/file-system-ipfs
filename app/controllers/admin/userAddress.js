// const User = require('../../models/user')
const address = require('../../models/address')
const { handleError } = require('../../middleware/utils')
const { getItems, checkQueryString } = require('../../middleware/db')

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const userAddress = async (req, res) => {
  try {
    // const query = await checkQueryString(req.query)
    const query = {}
    query.Daddress = req.body.userid
    const response = await getItems(req, address, query)
    res.status(200).json({
      success: true,
      result: response,
      message: 'User Address Details Fetch Successfully'
    })
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { userAddress }
