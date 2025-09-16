const admin = require('../database/init')
const db = admin.firestore()

async function getUserDataByUsername(
  username,
  selectFields = ['id', 'name', 'username', 'gender']
) {
  const snapshot = await db
    .collection('accounts')
    .where('username', '==', username)
    .select(...selectFields)
    .get()

  return snapshot.empty ? null : snapshot.docs[0].data()
}

async function searchUsersByUsername(username) {
  const snapshot = await db
    .collection('accounts')
    .orderBy('username')
    .startAt(username)
    .limit(7)
    .select('id', 'name', 'username', 'gender')
    .get()

  const results = snapshot.docs.map((doc) => doc.data())
  return results
}

module.exports = {
  getUserDataByUsername,
  searchUsersByUsername,
}
