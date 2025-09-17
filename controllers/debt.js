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

async function setDebtStatus(debtId, status) {
  const debt = await debtServices.setDebtStatus(debtId, status)
  return debt
}

async function acceptDebt(req, res) {
  const { debtId } = req.body

  try {
    const debt = await setDebtStatus(debtId, 'accepted')
    res.status(200).json(debt)
  } catch (err) {
    res.status(500).json({ error: "It's NOT you, it's US. Sorry" })
  }
}

async function rejectDebt(req, res) {
  const { debtId } = req.body

  try {
    const debt = await setDebtStatus(debtId, 'rejected')
    res.status(200).json(debt)
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

module.exports = { giveDebt, acceptDebt, rejectDebt, retrieveDebtRequests }
