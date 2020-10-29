const { Router } = require('express')
const authMiddleware = require('../middleware/auth.middleware')
const Order = require('../models/Order')

const router = Router()
const orderExample = {
  number: 123,
  createDate: 2342343,
  firmName: 'firmName',
  name: 'name',
  phoneNumber: 'phoneNumber',
  comment: 'comment',
  atiCode: 'atiCode'
}

// /api/order/create
router.post('/create', async (req, res) => {
  console.log('==> New request on /api/order/create', req.body)
  try {
    const order = new Order({
      number: req.body.number,
      firmName: req.body.firmName,
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      comment: req.body.comment,
      atiCode: req.body.atiCode
    })
    await order.save()
    res.status(201).json({ message: 'Новая заяка созданна', id: order._id })
    console.log('==> Create new order DONE')
  } catch (error) {
    res.status(500).json({ message: 'Error please try again later.' })
    console.log('==x ', error.message)
  }
})

// /api/order/edit/:id
router.post('/edit/:id', async (req, res) => {
  const id = req.params.id
  console.log('==> New request on /api/order/edit/:id = ', req.body)
  try {
    const order = await Order.findByIdAndUpdate(
      { _id: id },
      {
        firmName: req.body.firmName,
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        comment: req.body.comment,
        atiCode: req.body.atiCode,
        lastEditDate: Date.now()
      }
    )
    res.status(201).json({ message: 'Изменения сохранены' })
  } catch (error) {
    res.status(500).json({ message: 'Error please try again later.' })
    console.log('==x ', error.message)
  }
})

// /api/order/delete/:id
router.delete('/delete/:id', async (req, res) => {
  const id = req.params.id
  console.log('==> New request on /api/order/delete/:id = ', id)
  try {
    // await Order.find({ _id: id }).remove().exec()
    await Order.deleteOne({ _id: id })
    res.status(201).json({ message: 'order been delete' })
    console.log('===> Delete order DONE')
  } catch (error) {
    res.status(500).json({ message: 'Error please try again later.' })
    console.log('==x ', error.message)
  }
})

// /api/order/    get all orders from server
router.get('/', async (req, res) => {
  console.log('==> New request on /api/order/ ', req.body)
  try {
    const orders = await Order.find({})
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: 'Error please try again later.' })
    console.log('==x ', error.message)
  }
})

// /api/order/:id   get detail order by order id
router.get('/:id', async (req, res) => {
  console.log('==> New request on /api/order/:id    id =', req.params.id)
  const id = req.params.id
  try {
    try {
      const order = await Order.findById(id)
      res.json(order)
    } catch (error) {
      res.status(404).json({ message: 'Не существует такого ID: ' + id })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error please try again later.' })
    console.log('==x ', error.message)
  }
})

module.exports = router
