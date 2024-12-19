import { Router } from 'express'
import { getSkills, getSkillById, createSkill, updateSkillById, deleteSkillById } from '../controllers/skills.controller'
import { authenticate } from '../utils/authentication'

const router = Router()

router.get('/', getSkills)
router.get('/:id', getSkillById)

router.use(authenticate)

router.post('/', createSkill)
router.put('/:id', updateSkillById)
router.delete('/:id', deleteSkillById)

export const SkillsRouter = router;

