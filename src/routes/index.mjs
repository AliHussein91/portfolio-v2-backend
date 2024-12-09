import {Router} from 'express'
import projects from './projects.mjs'

const router = Router()


router.use('/projects', projects)


export default router;