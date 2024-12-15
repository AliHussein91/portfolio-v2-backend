import { Router } from 'express'
import { getProjects,getProjectById, createProject, updateProjectById, deleteProjectById } from '../controllers/projects.controller'

const router = Router()

router.get('/', getProjects)

router.get('/:id', getProjectById)

router.post('/', createProject)

router.put('/:id', updateProjectById)

router.delete('/:id', deleteProjectById)

export const ProjectsRouter = router;

