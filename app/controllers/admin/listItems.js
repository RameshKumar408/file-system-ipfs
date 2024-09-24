/* eslint-disable max-statements */
const { matchedData } = require('express-validator')
const { handleError } = require('../../middleware/utils')
const { createItem } = require('../../middleware/db')
const property = require('../../models/property')
const profiles = require('../../models/profile')
const user = require('../../models/user')

/**
 * Login function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const listItems = async (req, res) => {
  try {
    const data = await matchedData(req)

    const datas1 = []
    let num = 0
    const array = data.Owners_Detail.split(',')
    let temp = {}
    for (let i = 0; i < array.length; i++) {
      if (i % 2 === 0) {
        temp.Legal_Name = array[i]
        num++
      } else {
        temp.Active_Email = array[i]
        num++
      }
      if (num === 2) {
        datas1.push(temp)
        temp = {}
        num = 0
      }
    }
    data.Owners_Details = datas1
    delete data.Owners_Detail
    const user_id = req.user._id
    const role = req.user.role
    if (role === 'user') {
      const prof = await profiles.find({ userid: user_id })
      // if (prof[0]) {
      // if (prof[0].is_Verified !== '2') {
      //   res.status(404).json({
      //     success: false,
      //     result: null,
      //     message: 'Please Verify KYC'
      //   })
      // } else 
      // if (req.user.block_user === true) {
      //   res.status(404).json({
      //     success: false,
      //     result: null,
      //     message: 'Admin Blocked'
      //   })
      // } else {
      data.Current_Owner = user_id
      data.Owners_List = user_id
      const propertys = data.Property_Image.split(',')
      data.Property_Image = propertys
      const datas = await createItem(data, property)
      if (datas) {
        res.status(200).json({
          success: true,
          result: data,
          message: 'Property Posted Successfully'
        })
      }
      // }
      // } else {
      //   res.status(404).json({
      //     success: false,
      //     result: null,
      //     message: 'Need to Verify KYC'
      //   })
      // }

    } else {
      data.Current_Owner = user_id
      data.Owners_List = user_id
      const propertys = data.Property_Image.split(',')
      data.Property_Image = propertys
      const datas = await createItem(data, property)
      if (datas) {
        res.status(200).json({
          success: true,
          result: data,
          message: 'Property Posted Successfully'
        })
      }
    }
  } catch (error) {
    handleError(res, error)
  }
}
module.exports = { listItems }
