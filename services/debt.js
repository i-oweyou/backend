const admin = require('../database/init')
const db = admin.firestore()

async function giveDebt(data) {
  const docRef = db.collection('debts').doc()
  await docRef.set({ ...data })

  const snapshot = await docRef.get()
  await docRef.update({ id: docRef.id })
  return { id: docRef.id, ...snapshot.data() }
}

async function retrieveDebtRequests(userId) {
  const snapshot = await db
    .collection('debts')
    .where('borrowerId', '==', userId)
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

module.exports = { giveDebt, retrieveDebtRequests }
