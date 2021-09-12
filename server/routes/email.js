import { Router } from 'express'
import { Email } from '../controllers'

const router = Router()

router.post('/', Email.submit)

export default router
