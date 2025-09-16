const admin = require('../database/init')
const db = admin.firestore()
const { verify } = require('../utils/hashing')
const { getUserDataByUsername } = require('./user')

async function createAccount(data) {
  const docRef = db.collection('accounts').doc()
  await docRef.set({ ...data })

  const snapshot = await docRef.get()
  await docRef.update({ id: docRef.id })
  return { id: docRef.id, ...snapshot.data() }
}

async function loginAccount(data) {
  const { username, password } = data
  const user = await getUserDataByUsername(username, [
    'id',
    'name',
    'username',
    'gender',
    'password',
  ])
  if (!user) return null

  const isValid = await verify(password, user.password)
  return isValid ? user : null
}

module.exports = {
  createAccount,
  loginAccount,
}
