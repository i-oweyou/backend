const express = require('express')
const {
  validateSignupFields,
  validateLoginFields,
} = require('../middlewares/account')
const { createAccount, loginAccount } = require('../controllers/account')
const route = express.Router()

route.post('/signup', validateSignupFields, createAccount)
route.post('/login', validateLoginFields, loginAccount)

module.exports = route
