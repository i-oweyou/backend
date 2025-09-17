const userServices = require('../services/user')

async function getUserDataByUsername(req, res) {
  const { username } = req.params

  try {
    const user = await userServices.getUserDataByUsername(username)
    if (!user) return res.status(404).json({ error: 'User not found' })

    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ error: "It's NOT you, it's US. Sorry" })
  }
}

async function searchUsersByUsername(req, res) {
  const { username } = req.params

  try {
    const user = await userServices.searchUsersByUsername(username)
    if (!user) return res.status(404).json({ error: 'Users not found' })

    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ error: "It's NOT you, it's US. Sorry" })
  }
}

module.exports = { getUserDataByUsername, searchUsersByUsername }
