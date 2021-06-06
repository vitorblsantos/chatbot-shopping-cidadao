'use strict'

const Watson = (req, res) => {
  const { body } = req
  return res.status(200).send(body)
}

export default Watson
