const jwt = require('jsonwebtoken')
const { JWT_SECRET_KEY } = require('../config/config')

module.exports = (req, res, next) => {
  if (req.method === 'options') {
    return next()
  }
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      res.status(401).json({ message: 'Нет авторизации' })
    }
    const decodedToken = jwt.verify(token, JWT_SECRET_KEY)
    req.user = decodedToken
    next()
  } catch (error) {
    res.status(401).json({ message: 'Нет авторизации' })
    console.log(`===x ${__filename} failed`)
  }
}
