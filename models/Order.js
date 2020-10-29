const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  number: { type: Number, required: true, unique: true },
  createDate: { type: Date, default: Date.now },
  firmName: { type: String, require: true },
  name: { type: String, require: true },
  phoneNumber: { type: String, require: true },
  comment: { type: String, require: true },
  atiCode: { type: String, require: true },
  lastEditDate: { type: Date, default: null }
})

module.exports = model('Order', schema)
