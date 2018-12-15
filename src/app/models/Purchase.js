const moongose = require('mongoose')

const Purchase = new moongose.Schema({
  content: {
    type: String,
    required: true
  },
  purchaseAd: {
    type: moongose.Schema.Types.ObjectId,
    ref: 'Ad',
    required: true
  },
  user: {
    type: moongose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = moongose.model('Purchase', Purchase)
