const debtServices = require('../services/debt')

function buildDebtResponse(debt) {
  return {
    debtId: debt.id,
    borrowerId: debt.borrowerId,
    status: debt.status,
    createdAt: debt.createdAt,
  }
}

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
    res.status(201).json(buildDebtResponse(debtRes))
  } catch (err) {
    res.status(500).json({ error: "It's NOT you, it's US. Sorry" })
  }
}

module.exports = { giveDebt }
