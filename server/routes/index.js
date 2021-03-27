import { Router } from 'express'
import { join } from 'path'

const router = Router()

router.get('/', function (_, res) {
  res.status(200).sendFile(join(__dirname, '..', '..', '/build/client/index.html'))
})

router.get('/api', function (_, res) {
  res.status(200).json({ message: 'Shopping Cidadao' })
})

export default router
