// bibliotea para email
const nodemailer = require('nodemailer')

// reposnavel por navegar entre diretorios
const path = require('path')

// template HTML
const hbs = require('nodemailer-express-handlebars')

// Engine do Template HMTL
const exphbs = require('express-handlebars')

// config
const mailconfig = require('../../config/mail')

// metodo responsavel por enviar
const transport = nodemailer.createTransport(mailconfig)

// configuração do HBS
transport.use(
  'compile',
  hbs({
    viewEngine: exphbs(),
    viewPath: path.resolve(__dirname, '..', 'views', 'emails'),
    extName: '.hbs'
  })
)

module.exports = transport
