const express = require('express')

// variavel que contém todos os controllers
const controllers = require('./src/app/controllers')
// middleware de autenticacao
const authMiddeware = require('./src/app/middlewares/auth')

// validation midleware
const validate = require('express-validation')

// validators
const validators = require('./src/app/validators')
// handle controlers, enviar os erros ao nosso controlador de erros
const handle = require('express-async-handler')

const routes = express.Router()

routes.post(
  '/users',
  validate(validators.User),
  handle(controllers.UserController.store)
)
routes.post(
  '/sessions',
  validate(validators.Session),
  handle(controllers.SessionController.store)
)

// todos as rotas abaixo desta linha deverao estar autenticadas
routes.use(authMiddeware)

routes.get('/test', (req, res) => res.send('ok'))

/**
 * Rotas add
 */

// get all
routes.get('/ads', handle(controllers.AdController.index))
// get by id
routes.get('/ads/:id', handle(controllers.AdController.show))
// insert
routes.post(
  '/ads',
  validate(validators.Ad),
  handle(controllers.AdController.store)
)
// update
routes.put(
  '/ads/:id',
  validate(validators.Ad),
  handle(controllers.AdController.update)
)
// delete
routes.delete('/ads/:id', handle(controllers.AdController.destroy))

/**
 * Purchse
 */
routes.post(
  '/purchases',
  validate(validators.Purchase),
  handle(controllers.PurchaseController.store)
)

routes.get('/show', handle(controllers.PurchaseController.index))
routes.get('/accept', handle(controllers.PurchaseController.accept))

module.exports = routes
