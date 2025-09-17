const admin = require('../database/init')
const db = admin.firestore()

async function giveDebt(data) {
  const docRef = db.collection('debts').doc()
  await docRef.set({ ...data })

  const snapshot = await docRef.get()
  await docRef.update({ id: docRef.id })
  return { id: docRef.id, ...snapshot.data() }
}

async function setDebtStatus(debtId, status) {
  const docRef = db.collection('debts').doc(debtId)
  await docRef.update({ status: status }, { exists: true })

  return { debtId, status: status }
}

async function retrieveDebtRequests(userId) {
  const snapshot = await db
    .collection('debts')
    .where('borrowerId', '==', userId)
    .where('status', '==', 'pending')
    .select(
      'id',
      'borrowerId',
      'lenderId',
      'amount',
      'description',
      'createdAt',
      'paymentDate',
      'status'
    )
    .get()

  return snapshot.empty ? [] : snapshot.docs.map((doc) => doc.data())
}

module.exports = { giveDebt, setDebtStatus, retrieveDebtRequests }
