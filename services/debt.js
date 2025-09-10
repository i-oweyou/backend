const admin = require('../database/init')
const db = admin.firestore()

async function giveDebt(data) {
  const docRef = db.collection('debts').doc()
  await docRef.set({ ...data })

  const snapshot = await docRef.get()
  await docRef.update({ id: docRef.id })
  return { id: docRef.id, ...snapshot.data() }
}

module.exports = { giveDebt }
