const Ad = require('../models/Ad')
const User = require('../models/User')
const Purchase = require('../models/Purchase')
const PurchaseMail = require('../jobs/PurchaseMail')
// nosso servidor de job
const Queue = require('../services/Queue')

class PurchaseController {
  async index(req, res) {
    const purchase = await Purchase.find()
    return res.json(purchase)
  }

  async accept(req, res) {
    const { purchaseId } = req.body

    const purchase = await Purchase.findById(purchaseId)
    const ad = await Ad.findByIdAndUpdate(purchase.purchaseAd._id)

    if (!ad.purchasedBy) {
      ad.purchasedBy = purchase
    }

    return res.json(ad)
  }

  async store(req, res) {
    const { ad, content } = req.body

    // busca informação do ad no banco
    const purchaseAd = await Ad.findById(ad).populate('author')

    // pega o usuario logado
    const user = await User.findById(req.userId)

    // salva o ad
    await Purchase.create({ content, purchaseAd, user })

    // cria a fila
    Queue.create(PurchaseMail.key, {
      ad: purchaseAd,
      user,
      content
    }).save()

    return res.send()
  }
}

module.exports = new PurchaseController()
