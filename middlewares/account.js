const { hash } = require('../utils/hashing')

async function validateSignupFields(req, res, next) {
  const { name, gender, username, password } = req.body
  if (!name || !gender || !username || !password) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  if (!validateName(name)) {
    return res
      .status(400)
      .json({ error: 'Name must be at least 3 characters long' })
  }

  if (!validateGender(gender)) {
    return res.status(400).json({ error: 'Gender must be male or female' })
  }

  if (!validateUsername(username)) {
    return res.status(400).json({ error: 'Invalid username format' })
  }

  if (!validatePassword(password)) {
    return res
      .status(400)
      .json({ error: 'Password must be at least 8 characters long' })
  }

  req.body.password = await hash(password)

  next()
}

async function validateLoginFields(req, res, next) {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  if (!validateUsername(username)) {
    return res.status(400).json({ error: 'Invalid username format' })
  }

  if (!validatePassword(password)) {
    return res
      .status(400)
      .json({ error: 'Password must be at least 8 characters long' })
  }

  next()
}

function validateName(name) {
  return name?.length >= 3
}

function validateGender(gender) {
  return ['male', 'female'].includes(gender)
}

function validateUsername(username) {
  return /^[a-z][a-z0-9_]{2,19}$/.test(username)
}

function validatePassword(password) {
  return password?.length >= 8
}

module.exports = {
  validateSignupFields,
  validateLoginFields,
}
