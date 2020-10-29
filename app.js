const express = require('express')
const { PORT } = require('./config/config')
const { mongoUri } = require('./config/config')
const mongoose = require('mongoose')
const path = require('path')

const app = express()
app.use(express.json({ extended: true })) // midleware for parse request body

// routers for api
app.use('/api/auth', require('./routes/auth.route'))
app.use('/api/order', require('./routes/order.route'))

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const start = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    app.listen(PORT || 5555, () => {
      console.log(`=> Server started on port: ${PORT}`)
    })
  } catch (err) {
    console.error('=x ', err.message)
    process.exit(1)
  }
}

start()
