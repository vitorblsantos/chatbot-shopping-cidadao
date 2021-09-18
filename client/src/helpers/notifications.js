import { Api } from '.'

const sendEmail = async ({ email, id, link, usuario }) => {
  const params = {
    email,
    id,
    link,
    usuario
  }
  await Api.post('/email', { ...params })
}

export default {
  sendEmail
}
