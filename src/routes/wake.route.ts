import { Router } from 'express'

const router = Router()

router.get('/wake', (req, res) => {
    res.send('Awake!')
})

export const WakeRouter = router;
