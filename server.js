const expresss = require('express')
const routes = require('./routes')
const mongoose = require('mongoose')
const databaseConfig = require('./src/config/database')

class App {
  constructor() {
    this.express = expresss()
    this.isDev = process.env.NODE_ENV !== 'production'
    this.database()
    this.middleware()
    this.routes()
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
  }

  routes() {
    this.express.use(routes)
  }
}

module.exports = new App().express
