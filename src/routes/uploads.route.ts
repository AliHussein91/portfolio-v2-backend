import { Router } from 'express';

import { uploadImage, markInUse, getImages } from '../controllers/uploads.controller';

const router = Router()

// Get Images Meta Data
router.get('/', getImages);

// Upload endpoint
router.post('/', uploadImage);

// Mark image as in use
router.post('/:filename', markInUse);


export const UploadsRouter = router;
