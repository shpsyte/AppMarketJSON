const User = require('../models/User')

class SessionController {
  // Método para gerenciar se o usuário é autenticado
  async store(req, res) {
    // recupera os dados do body
    const { email, password } = req.body

    // procura um usuario
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ error: 'User not found' })
    }

    // metodo definido na User.js para comparar senha
    if (!(await user.compareHash(password))) {
      return res.status(400).json({ error: 'Invalid password' })
    }

    return res.json({ user, token: User.generateToken(user) })
  }
}

module.exports = new SessionController()
