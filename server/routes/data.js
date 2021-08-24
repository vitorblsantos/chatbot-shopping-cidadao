import { Router } from 'express'
import { Messages, Stations, Users } from '../controllers'

const router = Router()

router.get('/stations', Stations.get)

router.post('/users', Users.create)
router.post('/message', Messages.create)

export default router
