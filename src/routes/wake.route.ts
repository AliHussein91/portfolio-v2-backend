import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
    res.send('Awake!')
})

export const WakeRouter = router;
