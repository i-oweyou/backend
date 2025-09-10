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
    return res
      .status(400)
      .json({ error: 'Payment date cannot be before the debt date' })

  next()
}

module.exports = { validateDebt }
