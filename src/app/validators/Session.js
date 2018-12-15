// importa a Joi para validar
const Joi = require('joi')

// exporta o que queremos validar
module.exports = {
  body: {
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required()
  }
}
