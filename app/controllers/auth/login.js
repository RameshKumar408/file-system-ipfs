/* eslint-disable max-statements */
const { matchedData } = require('express-validator')

const {
  findUser,
  userIsBlocked,
  checkLoginAttemptsAndBlockExpires,
  passwordsDoNotMatch,
  saveLoginAttemptsToDB,
  saveUserAccessAndReturnToken,
  registerUser
} = require('./helpers')

const { handleError } = require('../../middleware/utils')
const { checkPassword } = require('../../middleware/auth')
const User = require('../../models/user')
const bcrypt = require('bcrypt')
const os = require('os');
/**
 * Login function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const login = async (req, res) => {
  try {
    var data = matchedData(req)

    // if (data?.deviceid == 'computer') {
    //   const networkInterfaces = os.networkInterfaces();
    //   var sts = Object.keys(networkInterfaces).map((interfaceName) => {
    //     const networkInterface = networkInterfaces[interfaceName];

    //     // Filter out loopback and non-IPv4 addresses
    //     const filteredInterfaces = networkInterface.filter(
    //       (details) => details.family === 'IPv4' && !details.internal
    //     );

    //     // Output MAC address for each filtered interface
    //     var dts = filteredInterfaces.map((details) => {
    //       console.log(`Interface: ${interfaceName}, MAC Address: ${details.mac}`);
    //       return details.mac
    //     });
    //     return dts[0]
    //   });
    //   data.deviceid = sts[1]
    // } else {
    //   data.deviceid = data?.deviceid
    // }
    // if (Boolean(data.check) === "true") {
    //   const user = await findUser(data.deviceid)
    //   console.log(user, 'saf')
    //   if (user.code == 404) {
    //     res.status(200).json({
    //       success: true,
    //       result: null,
    //       message: 'User Does Not Exist'
    //     })
    //   } else {
    //     const _id = user._id
    //     const datas = await User.findByIdAndUpdate(
    //       { _id },
    //       { password: bcrypt.hashSync(data.password, 5) }
    //     )
    //     const response = await saveUserAccessAndReturnToken(req, datas)
    //     res.status(200).json({
    //       success: true,
    //       result: response,
    //       message: 'Successfully Logged-in'
    //     })
    //   }
    // } else {
    //   const user = await findUser(data.deviceid)
    //   if (user.code !== 404) {
    //     await userIsBlocked(user)
    //     await checkLoginAttemptsAndBlockExpires(user)
    //     const isPasswordMatch = await checkPassword(data.password, user)
    //     if (!isPasswordMatch) {
    //       handleError(res, await passwordsDoNotMatch(user))
    //     } else {
    //       user.loginAttempts = 0
    //       await saveLoginAttemptsToDB(user)
    //       const response = await saveUserAccessAndReturnToken(req, user)
    //       res.status(200).json({
    //         success: true,
    //         result: response,
    //         message: 'Successfully Logged-in'
    //       })
    //     }
    //   } else {
    //     const item = await registerUser(data)
    //     const net = await network.find({})
    //     console.log("login  net:", net)
    //     if (net?.length > 0) {
    //       for (let i = 0; i < 3; i++) {
    //         const element = net[i];
    //         console.log("login  element:", element)
    //         if (element) {
    //           await User.findByIdAndUpdate({ _id: item._id }, { $push: { Networks: element._id } })
    //           const trade = await tradepair.find({ Network_id: element._id })
    //           console.log("login  trade:", trade)
    //           if (trade?.length > 0) {
    //             for (let j = 0; j < 3; j++) {
    //               const elements = trade[j];
    //               console.log("login  elements:", elements)
    //               if (elements) {
    //                 await User.findByIdAndUpdate({ _id: item._id }, { $push: { Coins: elements._id } })
    //               }
    //             }
    //           }
    //         }
    //       }
    //     }
    //     const response = await saveUserAccessAndReturnToken(req, item)
    //     res.status(200).json({
    //       success: true,
    //       result: response,
    //       message: 'User Registered successfully'
    //     })
    //   }
    // }
  } catch (error) {
    handleError(res, error)
  }
}
module.exports = { login }
