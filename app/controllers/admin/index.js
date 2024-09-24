const { getUsers } = require('./getUsers')
const { blockUser } = require('./blockUser')
const { adminForgotPassword } = require('./adminForgotPassword')

module.exports = {
  getUsers,
  blockUser,
  adminForgotPassword
}
