// const address = require('../../models/address')
const profile = require('../../models/user')
const { handleError } = require('../../middleware/utils')

const { listInitOptions } = require('../../middleware/db/listInitOptions')

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getUsers = async (req, res) => {
  try {
    // const query = await checkQueryString(req.query)
    // const start = new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
    const start = new Date(new Date().setHours(0, 0, 0, 0)).toISOString()
    const options = await listInitOptions(req)
    // const query = profile.find().populate('userid', {
    //   _id: 1,
    //   Email_Address: 1,
    //   Phone_NO: 1,
    //   Last_Name: 1,
    //   First_Name: 1
    // })
    const query = profile.find()
    const response = await profile.paginate(query, options)
    const data = await profile.find({ createdAt: { $gte: start } })
    const data1 = await profile.find({ block_user: false })
    response.newentry = data.length
    response.activeuser = data1.length
    res.status(200).json({
      success: true,
      result: response,
      message: 'USERS DETAILS FETCH SUCCESSFULLY'
    })
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getUsers }
