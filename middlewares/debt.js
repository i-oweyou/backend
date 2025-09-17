const admin = require('../database/init')
const db = admin.firestore()

function validateDebt(req, res, next) {
  const { borrowerId, amount, paymentDate } = req.body
  const lenderId = req.user.id
  const createdAt = new Date()

  if (lenderId === borrowerId)
    return res.status(400).json({ error: 'Cannot lend to yourself' })

  if (amount <= 0)
    return res.status(400).json({ error: 'Amount must be positive' })

  const paymentDateObj = new Date(paymentDate)
  if (isNaN(paymentDateObj))
    return res.status(400).json({ error: 'Invalid payment date' })

  if (paymentDateObj < createdAt)
    return res.status(400).json({ error: 'Payment date cannot be in the past' })

  next()
}

async function validateDebtId(req, res, next) {
  const { debtId } = req.body
  const borrowerId = req.user.id

  try {
    const snapshot = await db
      .collection('debts')
      .where('__name__', '==', debtId)
      .select('borrowerId')
      .get()

    if (snapshot.empty) return res.status(404).json({ error: 'Debt not found' })

    const debt = snapshot.docs[0].data()
    if (debt?.borrowerId !== borrowerId)
      return res.status(403).json({ error: 'Not your debt to accept' })

    return next()
  } catch (err) {
    return res.status(500).json({ error: "It's NOT you, it's US. Sorry" })
  }
}

module.exports = { validateDebt, validateDebtId }
