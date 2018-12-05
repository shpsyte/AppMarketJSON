const User = require('../models/User')

class UserController {
  async store(req, res) {
    // pega os dados do body da nossa requisicao
    const { email } = req.body

    // findOne, retora se encontro o objeto no banco
    if (await User.findOne({ email })) {
      return res.status(400).json({ error: 'User alreade exists' })
    }

    // Cria um objeto no banco
    const user = await User.create(req.body)

    return res.json(user)
  }
}

module.exports = new UserController()
