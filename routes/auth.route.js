const { Router } = require('express')
const bcrypt = require('bcrypt')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { JWT_SECRET_KEY } = require('../config/config')

const router = Router()

// /api/auth/register
router.post(
  '/register',
  [
    check('email', 'invalid email').isEmail(),
    check('password', 'invalid password').isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      console.log('==> New request on /api/auth/register ', req.body)

      // validate email and password and find errors and send it on front
      errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Неверно введены данные.'
        })
      }

      const { email, password } = req.body

      // find this email in db
      const candidate = await User.findOne({ email: email })
      if (candidate) {
        return res.status(400).json({ message: 'Этот email уже используется.' })
      }

      // if not founded, create new user and save it
      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User({ email, password: hashedPassword })
      await user.save()
      res.status(201).json({ status: 'ok', message: 'Пользователь успешно создан.' })
    } catch (error) {
      res.status(500).json({ message: 'Error please try again later.' })
      console.log('==x ', error.message)
    }
  }
)

// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'invalid email').normalizeEmail().isEmail(),
    check('password', 'invalid password').isLength({ min: 6 })
  ],
  async (req, res) => {
    console.log('==> New request on /api/auth/login ', req.body)
    try {
      // validate email and password and find errors and send it on front
      errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Неверные email или пароль.'
        })
      }

      const { email, password } = req.body

      // try found user email in DB
      const user = await User.findOne({ email })
      if (!user) {
        return res
          .status(400)
          .json({ message: 'Такого пользователя не существует.' })
      }
      // compare password from response and DB
      const isPasswordCorrect = await bcrypt.compare(password, user.password)
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: 'Неверный пароль.' })
      }
      const token = jwt.sign({ userId: user.id }, JWT_SECRET_KEY, {
        expiresIn: '1h'
      })
      return res.status(200).json({ token, userId: user.id })
    } catch (error) {
      res.status(500).json({ message: 'Error please try again later.' })
      console.log('==x ', error.message)
    }
  }
)

module.exports = router
