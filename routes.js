const express = require('express')
const UserController = require('./src/app/controllers/UserController')
const SessionController = require('./src/app/controllers/SessionController')
const authMiddeware = require('./src/app/middlewares/auth')
const routes = express.Router()

routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.store)

routes.get('/test', authMiddeware, (req, res) => res.json({ ok: 'Tudo certo' }))

module.exports = routes
