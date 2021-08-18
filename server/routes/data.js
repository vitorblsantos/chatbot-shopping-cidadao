import { Router } from 'express'
import { Messages, Users } from '../controllers'

const router = Router()

router.post('/users', Users.create)

router.post('/message', Messages.create)

export default router
