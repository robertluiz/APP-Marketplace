const Ad = require('../models/Ad')
const User = require('../models/User')
const MailService = require('../services/MailService')

class PurchaseController {
  async store (req, res) {
    const { ad, content } = req.body

    const purchaseAd = await Ad.findById(ad).populate('author')
    const user = await User.findById(req.userId)

    await MailService.sendMail({
      from: '"Robert Luiz" <teste@teste.com>',
      to: purchaseAd.author.email,
      subject: `Solicitação de compra: ${purchaseAd.title}`,
      html: `<p>Teste de solicitação: ${content} </p>`
    })

    return res.send()
  }
}

module.exports = new PurchaseController()
