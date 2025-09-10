const express = require('express')
const route = express.Router()
const {
  validateSignupFields,
  validateLoginFields,
} = require('../middlewares/account')
const { createAccount, loginAccount } = require('../controllers/account')

route.post('/signup', validateSignupFields, createAccount)
route.post('/login', validateLoginFields, loginAccount)

module.exports = route
