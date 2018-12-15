const Email = require('../services/Mail')

// criarremos em formate de classe com um metodo GET para acessar de forma
// estatica

class PurchaseMail {
  get key() {
    return 'PurchaseMail'
  }

  async handle(job, done) {
    // na variava JOB vem todas as informações do body que precisamos
    const { ad, user, content } = job.data
    // envia o mail
    await Email.sendMail({
      from: '"José Luiz" <jose.iscositemas@gmail.com>',
      to: ad.author.email,
      subject: `Solicitação Compra ${ad.title}`,
      template: 'purchase',
      context: { user, content, ad }
    })

    // finaliza e avisa o JOB
    return done()
  }
}

module.exports = new PurchaseMail()
