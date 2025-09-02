const bcrypt = require('bcrypt')

async function hash(password) {
  const saltRounds = 12
  return await bcrypt.hash(password, saltRounds)
}

async function verify(password, hash) {
  return await bcrypt.compare(password, hash)
}

module.exports = {
  hash,
  verify,
}
