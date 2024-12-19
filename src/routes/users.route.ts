import { Router } from 'express'
import { getUsers, getUserById, createUser, updateUserById, deleteUserById } from '../controllers/users.controller'
import { authenticate } from '../utils/authentication'

const router = Router()

router.use(authenticate)

router.get('/', getUsers)

router.get('/:id', getUserById)

router.post('/', createUser)

router.put('/:id', updateUserById)

router.delete('/:id', deleteUserById)

export const UsersRouter = router;

