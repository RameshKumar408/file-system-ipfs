
const { getRefreshToken } = require('./getRefreshToken')
const { login } = require('./login')
const { loginByAdmin } = require('./loginByAdmin')
const { register } = require('./register')
const { roleAuthorization } = require('./roleAuthorization')
const { profile } = require('./profile')
const { profileUpdate } = require('./profileUpdate')

module.exports = {
  getRefreshToken,
  login,
  loginByAdmin,
  register,
  roleAuthorization,
  profile,
  profileUpdate,
}
