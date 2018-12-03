const moongose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../../config/auth')

// Sschema dos usuários
const UserShema = new moongose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: {
    type: String
  },
  createAd: {
    type: Date,
    default: Date.now
  }
})

// Hooks são exutados antes ou depois de alguma ação do banco de dados
UserShema.pre('save', async function(next) {
  // é preciso usar function convercional, pois ele vai usar o THIS deste contexto,
  // se usarmos arrow function o this vai ser da function
  if (!this.isModified('password')) {
    return next()
  }

  // critograda a sennha usando bcrypt
  this.password = await bcrypt.hash(this.password, 8)
})

// Criar metodos na classe user
UserShema.methods = {
  compareHash(password) {
    return bcrypt.compare(password, this.password)
  }
}

UserShema.statics = {
  // usando desestruturaçao para a variavel
  generateToken({ id }) {
    // configurando o jwt, pegando configutração do arquivo auth.js
    return jwt.sign({ id }, auth.secret, {
      expiresIn: auth.ttl
    })
  }
}

module.exports = moongose.model('User', UserShema)
