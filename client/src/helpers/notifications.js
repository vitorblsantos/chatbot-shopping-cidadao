import { Api } from '.'

const sendEmail = async ({ email, id, link, usuario }) => {
  const params = {
    email,
    id,
    link,
    usuario
  }
  console.log(params)
  await Api.post('/email', { ...params })
}

export default {
  sendEmail
}
