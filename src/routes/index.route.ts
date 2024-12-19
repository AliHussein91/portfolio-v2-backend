import {Router} from 'express'
import { ProjectsRouter } from './projects.route'
import { MessagesRouter } from './messages.route'
import { SkillsRouter } from './skills.route'
import { AuthRouter } from './auth.route'
import { UsersRouter } from './users.route'

const router = Router()

router.use('/auth', AuthRouter)
router.use('/users', UsersRouter)
router.use('/projects', ProjectsRouter)
router.use('/messages', MessagesRouter)
router.use('/skills', SkillsRouter)


export const IndexRouter = router;