import { Router } from 'express'
import { Schedules } from '../controllers'

const router = Router()

router.get('/available', Schedules.getAvailableDates)
router.get('/:id', Schedules.getByIdentifier)
router.get('/', Schedules.get)

router.post('/active', Schedules.active)
router.post('/inactive', Schedules.inactive)
router.post('/', Schedules.create)

export default router
