const express = require('express')
const route = express.Router()
const { authenticate } = require('../middlewares/auth')
const { validateDebt } = require('../middlewares/debt')
const { giveDebt } = require('../controllers/debt')

route.post('/give', authenticate, validateDebt, giveDebt)

module.exports = route
