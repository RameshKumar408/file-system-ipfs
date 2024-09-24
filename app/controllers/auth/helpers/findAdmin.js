// const Admin = require('../../../models/admin')
const User = require('../../../models/user')
const { itemNotFound } = require('../../../middleware/utils')

/**
 * Finds admin by email
 * @param {string} email - admin´s email
 */
const findAdmin = (email = '') => {
  return new Promise((resolve, reject) => {
    User.findOne(
      {
        email
      },
      'password loginAttempts blockExpires name email role verified verification',
      async (err, item) => {
        try {
          await itemNotFound(err, item, 'Incorrect Email')
          resolve(item)
        } catch (error) {
          reject(error)
        }
      }
    )
  })
}

module.exports = { findAdmin }
