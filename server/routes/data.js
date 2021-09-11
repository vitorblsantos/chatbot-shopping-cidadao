import { Router } from 'express'
import { Messages, Schedules, Stations, Users } from '../controllers'

const router = Router()

router.get('/schedules/:id', Schedules.getByIdentifier)
router.get('/schedules/available', Schedules.getAvailableDates)
router.get('/stations', Stations.get)
router.get('/users/:email', Users.get)

router.post('/users', Users.create)
router.post('/message', Messages.create)
router.post('/schedules', Schedules.create)

export default router
