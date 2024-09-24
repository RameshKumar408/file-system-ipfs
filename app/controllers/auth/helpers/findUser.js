const User = require('../../../models/user')
const { itemNotFound } = require('../../../middleware/utils')

/**
 * Finds user by email
 * @param {string} email - user´s email
 */
const findUser = (deviceid = '') => {
  return new Promise((resolve, reject) => {
    User.findOne(
      {
        deviceid
      },
      'password loginAttempts blockExpires deviceid role verified verification wadress',
      async (err, item) => {
        try {
          await itemNotFound(err, item, 'USER_DOES_NOT_EXIST')
          resolve(item)
        } catch (error) {
          resolve(error)
        }
      }
    )
  })
}

module.exports = { findUser }
