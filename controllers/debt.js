const debtServices = require('../services/debt')

async function giveDebt(req, res) {
  const { borrowerId, amount, description, paymentDate } = req.body
  const lenderId = req.user.id
  const createdAt = new Date()

  const debt = {
    borrowerId,
    lenderId,
    amount,
    description,
    paymentDate,
    status: 'pending',
    createdAt: createdAt.toISOString(),
  }

  try {
    const debtRes = await debtServices.giveDebt(debt)
    res.status(201).json(debtRes)
  } catch (err) {
    res.status(500).json({ error: "It's NOT you, it's US. Sorry" })
  }
}

async function retrieveDebtRequests(req, res) {
  const userId = req.user.id

  try {
    const debts = await debtServices.retrieveDebtRequests(userId)
    res.status(200).json(debts)
  } catch (err) {
    res.status(500).json({ error: "It's NOT you, it's US. Sorry" })
  }
}

module.exports = { giveDebt, retrieveDebtRequests }
