const Ad = require('../models/Ad')

class AdController {
  async index(req, res) {
    // definimos uma variavel vazia
    const filters = {
      purchasedBy: null
    }

    // se houver filtros de preco
    if (req.query.price_min || req.query.price_max) {
      // utilizamos o mesmo noma da coluna no model
      filters.price = {}

      if (req.query.price_min) {
        // greter then, interpretado pelo mongoose
        filters.price.$gte = req.query.price_min
      }
      if (req.query.price_max) {
        // lower then, interpretado pelo mongoose
        filters.price.$lte = req.query.price_max
      }
    }
    // filtro para titulos
    if (req.query.title) {
      // nome igual da coluna
      filters.title = new RegExp(req.query.title, 'i')
    }

    // retorna todos registros com paginação, veja o segundo parametro que está
    // sendo configurado
    const ad = await Ad.paginate(filters, {
      page: req.query.page || 1,
      limit: parseInt(req.query.limit || 20),
      populate: 'author', // metodo para include author
      sort: '-createdAt'
    })
    return res.json(ad)
  }
  async show(req, res) {
    // retorn por id
    const ad = await Ad.findById(req.params.id)
    return res.json(ad)
  }
  async store(req, res) {
    // cria um obj alterando o autor para o usuário logado, que vem na req header
    const ad = await Ad.create({ ...req.body, author: req.userId })

    return res.json(ad)
  }
  async update(req, res) {
    // encontra e altera nosso objeto no banco
    const ad = await Ad.findByIdAndUpdate(req.params.id, req.body, {
      // altera o objeto para os dados do body
      new: true
    })

    return res.json(ad)
  }
  async destroy(req, res) {
    await Ad.findByIdAndRemove(req.params.id)

    return res.send()
  }
}

module.exports = new AdController()
