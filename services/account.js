const admin = require('../database/init')
const { verify } = require('../utils/hashing')
const db = admin.firestore()

async function createAccount(data) {
  const docRef = db.collection('accounts').doc()
  await docRef.set({ ...data })

  const snapshot = await docRef.get()
  await docRef.update({ id: docRef.id })
  return { id: docRef.id, ...snapshot.data() }
}

async function loginAccount(data) {
  const { username, password } = data
  const user = await getUserByUsername(username)
  if (!user) return null

  const isValid = await verify(password, user.password)
  return isValid ? user : null
}

async function getUserByUsername(username) {
  const snapshot = await db
    .collection('accounts')
    .where('username', '==', username)
    .get()

  return snapshot.empty ? null : snapshot.docs[0].data()
}

module.exports = { createAccount, loginAccount, getUserByUsername }
