const moongose = require('mongoose')
const moongosePaginate = require('mongoose-paginate')

// Shema AD
const Ad = new moongose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  // manereira de relacionar entidades no MongoDB, esta 1 par 1,
  // se fosse um conjunto de autores bastaria envolver com []
  author: {
    type: moongose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  purchasedBy: {
    type: moongose.Schema.Types.ObjectId,
    ref: 'Purchase',
    required: false
  },
  createAt: {
    type: Date,
    default: Date.now
  }
})

Ad.plugin(moongosePaginate)

module.exports = moongose.model('Ad', Ad)
