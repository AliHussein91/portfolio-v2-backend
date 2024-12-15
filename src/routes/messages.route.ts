import { Router } from 'express'
import { getMessages, createMessage, updateMessageById, deleteMessageById, getMessageById } from '../controllers/messages.controller'

const router = Router()

router.get('/', getMessages)

router.get('/:id', getMessageById)

router.post('/', createMessage)

router.put('/:id', updateMessageById)

router.delete('/:id', deleteMessageById)

export const MessagesRouter = router;

