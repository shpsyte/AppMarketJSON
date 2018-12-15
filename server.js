require('dotenv').config()

const expresss = require('express')
const routes = require('./routes')
const mongoose = require('mongoose')
const databaseConfig = require('./src/config/database')

const validate = require('express-validation')

// deixa nossos erros mais legiveis
const Youch = require('youch')

// repositorio de erros
const Sentry = require('@sentry/node')

class App {
  constructor() {
    this.express = expresss()
    this.isDev = process.env.NODE_ENV !== 'production'
    this.sentry()
    this.database()
    this.middleware()
    this.routes()
    this.exception()
  }

  sentry() {
    Sentry.init({
      dsn: process.env.SENTRY_DSN
    })
  }

  database() {
    mongoose.connect(
      databaseConfig.uri,
      {
        // par o mongo saber que estamos usando uma vesão mais recente do node
        useCreateIndex: true,
        useNewUrlParser: true
      }
    )
  }

  middleware() {
    // faz o express entender JSON
    this.express.use(expresss.json())

    // sentry configuration
    this.express.use(Sentry.Handlers.errorHandler())
  }

  routes() {
    this.express.use(routes)
  }

  // tratamento de erros
  exception() {
    if (process.env.NODE_ENV === 'production') {
      this.express.use(Sentry.Handlers.errorHandler())
    }

    this.express.use(async (err, req, res, next) => {
      // se o erro é da instancia de validade vamos retornar um JSON formatado
      if (err instanceof validate.ValidationError) {
        return res.status(err.status).json(err)
      }

      if (process.env.NODE_ENV !== 'production') {
        const youch = new Youch(err)
        return res.json(await youch.toJSON())
      }

      // se não for erro de validação vamos retornar:
      return res
        .status(err.status || 500)
        .json({ error: 'Internal Server Error ' })
    })
  }
}

module.exports = new App().express
