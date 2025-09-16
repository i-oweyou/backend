const express = require('express')
const route = express.Router()
const { authenticate } = require('../middlewares/auth')
const { validateDebt } = require('../middlewares/debt')
const { giveDebt, retrieveDebtRequests } = require('../controllers/debt')

route.post('/give', authenticate, validateDebt, giveDebt)
route.get('/requests', authenticate, retrieveDebtRequests)

module.exports = route
