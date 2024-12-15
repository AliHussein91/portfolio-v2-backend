import { Router } from 'express'
import { getSkills, getSkillById, createSkill, updateSkillById, deleteSkillById } from '../controllers/skills.controller'

const router = Router()

router.get('/', getSkills)

router.get('/:id', getSkillById)

router.post('/', createSkill)

router.put('/:id', updateSkillById)

router.delete('/:id', deleteSkillById)

export const SkillsRouter = router;

