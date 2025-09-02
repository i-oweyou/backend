const jwt = require('jsonwebtoken')
require('dotenv').config()

const SECRET = process.env.JWT_SECRET || 'supersecretHAHA'

function signToken(payload) {
  return jwt.sign(payload, SECRET)
}

function verifyToken(token) {
  return jwt.verify(token, SECRET)
}

module.exports = { signToken, verifyToken }
