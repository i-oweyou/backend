const accountService = require('../services/accountService')

async function createAccount(req, res) {
  try {
    if (!(await uniqueUsername(req.body.username))) {
      return res.status(400).json({ error: 'Username is already taken' })
    }

    const account = await accountService.createAccount(req.body)
    res.status(201).json(account)
  } catch (err) {
    res.status(500).json({ error: "It's NOT you, it's US. Sorry" })
  }
}

async function loginAccount(req, res) {
  try {
    const account = await accountService.loginAccount(req.body)
    if (!account) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }
    res.status(200).json(account)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "It's NOT you, it's US. Sorry" })
  }
}

async function uniqueUsername(username) {
  try {
    const user = await accountService.getUserByUsername(username)
    return !user
  } catch (err) {
    return false
  }
}

module.exports = { createAccount, loginAccount }
