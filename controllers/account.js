const accountServices = require('../services/account')
const { signToken } = require('../services/auth')

function buildAuthResponse(account) {
  const safeAccount = {
    id: account?.id,
    name: account?.name,
    gender: account?.gender,
    username: account?.username,
  }
  const token = signToken(safeAccount)

  return { account: safeAccount, token }
}

async function createAccount(req, res) {
  try {
    if (!(await uniqueUsername(req.body.username))) {
      return res.status(400).json({ error: 'Username is already taken' })
    }

    const account = await accountServices.createAccount(req.body)
    res.status(201).json(buildAuthResponse(account))
  } catch (err) {
    res.status(500).json({ error: "It's NOT you, it's US. Sorry" })
  }
}

async function loginAccount(req, res) {
  try {
    const account = await accountServices.loginAccount(req.body)
    if (!account) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    res.status(200).json(buildAuthResponse(account))
  } catch (err) {
    res.status(500).json({ error: "It's NOT you, it's US. Sorry" })
  }
}

async function uniqueUsername(username) {
  try {
    const user = await accountServices.getUserByUsername(username)
    return !user
  } catch (err) {
    return false
  }
}

module.exports = { createAccount, loginAccount }
