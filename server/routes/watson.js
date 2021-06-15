import { Router } from 'express'
import { Watson } from '../controllers'

const router = Router()

router.get('/session', Watson.createSession)

router.post('/message', Watson.sendMessage)

export default router
