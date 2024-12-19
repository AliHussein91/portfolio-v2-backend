import { Router } from 'express'
import { getMessages, createMessage, updateMessageById, deleteMessageById, getMessageById } from '../controllers/messages.controller'
import { authenticate } from '../utils/authentication'

const router = Router()

router.post('/', createMessage)

router.use(authenticate)
router.get('/', getMessages)
router.get('/:id', getMessageById)
router.put('/:id', updateMessageById)
router.delete('/:id', deleteMessageById)

export const MessagesRouter = router;

