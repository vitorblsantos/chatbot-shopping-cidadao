'use strict'

import { Router } from 'express'

const router = Router()

router.get('/', (_, res) => res.status(200).send('teste'))

export default router
