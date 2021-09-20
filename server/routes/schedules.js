import { Router } from 'express'
import { Schedules } from '../controllers'

const router = Router()

router.get('/active/:id', Schedules.active)
router.get('/available', Schedules.getAvailableDates)
router.get('/inactive/:id', Schedules.inactive)
router.get('/:id', Schedules.getByIdentifier)
router.get('/', Schedules.get)

router.post('/', Schedules.create)

export default router
