import { Router } from 'express';

import { uploadImage, markInUse, getImages } from '../controllers/uploads.controller';
import { authenticate } from '../utils/authentication';

const router = Router()


router.use(authenticate)
// Get Images Meta Data
router.get('/', getImages);

// Upload endpoint
router.post('/', uploadImage);

// Mark image as in use
router.put('/:filename', markInUse);


export const UploadsRouter = router;
