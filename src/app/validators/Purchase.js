// importa a Joi para validar
const Joi = require('joi')

// exporta o que queremos validar
module.exports = {
  body: {
    ad: Joi.string().required(),
    content: Joi.string().required()
  }
}
