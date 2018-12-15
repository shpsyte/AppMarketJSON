const kue = require('kue')
// importa a configuracao do Redis
const redisConfig = require('../../config/redis')

// importa a gestão de erros
const Sentry = require('@sentry/node')
// importa todos os jobs
const jobs = require('../jobs')

// cria o servivo de queue
const Queue = kue.createQueue({ redis: redisConfig })

// processa os jobs que tem a key definide no jobs
Queue.process(jobs.PurchaseMail.key, jobs.PurchaseMail.handle)

// Eventopara capturar o erro
Queue.on('error', Sentry.captureException)

module.exports = Queue
