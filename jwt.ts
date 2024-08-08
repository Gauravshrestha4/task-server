const jwt = require('jsonwebtoken')

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' })
}

const verifyToken = (token) => {
  console.log('-----')
  console.log('secrete=', process.env.JWT_SECRET)
  return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = { generateToken, verifyToken }
