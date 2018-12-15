// importa a Joi para validar
const Joi = require('joi')

// exporta o que queremos validar
module.exports = {
  body: {
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required()
  }
}
