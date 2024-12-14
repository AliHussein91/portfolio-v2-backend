import { Router } from 'express'
import { getProjects, createProject, updateProjectById, deleteProjectById } from '../handlers/projects'

const router = Router()

router.get('/', getProjects)

router.post('/', createProject)

router.put('/:id', updateProjectById)

router.delete('/:id', deleteProjectById)

export default router;

