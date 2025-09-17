const express = require('express')
const route = express.Router()
const { authenticate } = require('../middlewares/auth')
const { validateDebt, validateDebtId } = require('../middlewares/debt')
const {
  giveDebt,
  acceptDebt,
  rejectDebt,
  retrieveDebtRequests,
} = require('../controllers/debt')

route.post('/give', authenticate, validateDebt, giveDebt)
route.post('/accept', authenticate, validateDebtId, acceptDebt)
route.post('/reject', authenticate, validateDebtId, rejectDebt)
route.get('/requests', authenticate, retrieveDebtRequests)

module.exports = route
