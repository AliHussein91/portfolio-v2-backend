import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
    res.status(200).json({'message': 'Server is awake!'})
})

export const WakeRouter = router;
