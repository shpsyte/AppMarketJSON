const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')
const { promisify } = require('util')

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' })
  }

  // o Header vem com o a Authorization: 'bearer TOKEN', logo para
  // pegar somente o token e descartar a plavar beaer podemos
  const [, token] = authHeader.split(' ')

  try {
    // vamos usar o promofy pois o jwt.verify não é uma promisse
    // também poderíamos usar a função de callback
    // na variavel decoded vai retornar o ID, já que no UserJS configuramos o JWT em seu
    // primeiro parametro o ID
    const decoded = await promisify(jwt.verify)(token, authConfig.secret)

    console.log('decode', decoded)

    // salva o id do usuário para promissas requisições
    req.userId = decoded.id
    return next()
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid!', err })
  }
}
