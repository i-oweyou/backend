const express = require('express')
const route = express.Router()
const {
  validateSignupFields,
  validateLoginFields,
} = require('../middlewares/account')
const {
  createAccount,
  loginAccount,
  getDataByUsername,
} = require('../controllers/account')
const { authenticate } = require('../middlewares/auth')

route.post('/signup', validateSignupFields, createAccount)
route.post('/login', validateLoginFields, loginAccount)
route.get('/user/:username', authenticate, getDataByUsername)

module.exports = route
