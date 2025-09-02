const { verifyToken } = require('../services/auth')

function authenticate(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) return res.status(401).json({ error: 'No token provided' })

  try {
    const decoded = verifyToken(token)
    req.user = decoded
    next()
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' })
  }
}

module.exports = { authenticate }
