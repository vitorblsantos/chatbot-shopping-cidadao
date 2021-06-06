import { Router } from 'express'
import { Watson } from '../controllers'

const router = Router()

router.get('/', Watson)

export default router
