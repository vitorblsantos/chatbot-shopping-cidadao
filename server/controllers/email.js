import { createTransport } from 'nodemailer'

const submit = async (req, res) => {
  const { email, id, link, usuario } = req.body

  const main = async () => {
    const template = `<html lang="pt-br"><head><meta charset="utf-8" /><style>body, div, html{ font-family: -apple-system, blinkmacsystemfont, "segoe ui", roboto, "helvetica neue", arial, "noto sans", sans-serif, "apple color emoji", "segoe ui emoji", "segoe ui symbol", "noto color emoji"; font-size: 16px;} body, div, p, table, th, tr{ box-sizing: border-box; margin: 0; padding: 0;} td, th, tr{ font-size: inherit; text-align: start; vertical-align: initial;} img{ height: 100%; width: auto;} .board{ background: #000; color: #fff; margin: 0 0 12px; padding: 12px; position: relative; text-align: center;} .box{ background: #fff; border-radius: 20px; box-shadow: 0 0 3px -2px rgba(0, 0, 0, .2), 0 0 4px 0 rgba(0, 0, 0, .14), 0 0px 8px 0 rgba(0, 0, 0, .12); margin: 0 auto; padding: 20px 0; width: 600px;} .container{ border: 1px solid #f1f1f1; max-width: 800px; margin: 0 auto; padding: 12px 4px; width: 100%;} .container__header{ border-bottom: 2px solid #ff7f6f;} .container__body{ background: url("https://cidadao.mg.gov.br/assets/bg-repeat.png") repeat; padding: 60px 0;} .container__footer{ background: #ff7f6f; color: #fff; font-size: .95em; font-weight: 600; padding: 4px 0;} .content{ font-size: 1em; padding: 20px 40px;} .logo{ border: 1px solid #ccc; border-radius: 20px; height: 80px; margin: 0 auto; padding: 12px; width: 80px;} .obs{ font-size: .65em; margin: 32px 0 0;} .paragraph{ margin: 0 0 8px;} .paragraph--center{ margin: 0; text-align: center;} .small{ color: #000; font-size: .7em; margin: 28px 0 4px;} .sponsor{ display: inline-block; height: 52px; width: 268px;} @media (max-width: 992px){ .board{ font-size: .8rem;} .box{ width: 300px;} .container{ max-width: 362px;} .container__body{ padding: 40px 0;} .container__footer{ font-size: .75em;} .content{ padding: 16px;} .logo{} .sponsor{ height: 32px; width: 220px;}} </style></head><body><table class="container container__header"><tr><td><div class="sponsor"><img alt="" src="https://cidadao.mg.gov.br/assets/logo-cidadao.png" /></div></td></tr></table><table class="container container__body"><tr><td><div class="box"><div class="logo"><img alt="" src="https://chatbot-cidadao.herokuapp.com/images/bot.png" /></div><div class="content"><p class="paragraph">Olá, ${usuario}.</p><p class="paragraph">Recentemente, você realizou um agendamento usando o chatbot do portal uai.</p><p class="paragraph">Logo abaixo, esta disponível o código do seu agendamento. você pode usar esse código para consultar seus agendamentos no chatbot.</p><div class="small">Cód. do agendamento:</div><div class="board">${id} </div><p class="paragraph"><a href="${link}">Clique aqui</a>, para confirmar seu agendamento.</p><div class="obs">OBS.: Esse link tem validade de 2(duas) horas. caso você não confirme o seu agendamento, ele vai ser cancelado automaticamente e essa data voltara a ser disponibilizada no portal.</div></div></div></td></tr></table><table class="container container__footer"><tr><td><p class="paragraph paragraph--center">Chatbot UAI © ${new Date().getFullYear()}</p></td></tr></table></body></html>`
    const transporter = createTransport({
      auth: {
        user: 'dreamteamfiap21@gmail.com',
        pass: 'vfjkfqsobofmuhib'
      },
      host: 'smtp.gmail.com',
      port: 465,
      secure: true
    })
    const info = {
      from: '"Chatbot - UAI 🤖" <nao-responda@uai.com.br>',
      html: template,
      subject: 'Agendamento - UAI 🤖',
      to: email
    }
    return await transporter.sendMail(info)
  }

  try {
    const info = await main()
    res.status(200).send(info)
  } catch (err) {
    res.status(500).send(err)
  }
}

export default {
  submit
}
