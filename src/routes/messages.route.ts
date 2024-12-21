import { Router } from 'express'
import { getMessages, createMessage,  deleteMessageById, getMessageById, markAsRead, markAsUnread } from '../controllers/messages.controller'
import { authenticate } from '../utils/authentication'

const router = Router()

router.post('/', createMessage)

router.use(authenticate)
router.get('/', getMessages)
router.get('/:id', getMessageById)
router.put('/read/:id', markAsRead)
router.put('/unread/:id', markAsUnread)
router.delete('/:id', deleteMessageById)

export const MessagesRouter = router;

