import path from 'path';
import { ImageMetadata } from '../model/imagesMetaData.model';
import fs from 'fs';
import { clear } from 'console';

const uploadDir = path.join(__dirname, 'public', 'imgs');

// Cleanup job
export const deleteUnusedImages = async () => {
    const images = await ImageMetadata.find({ isInUse: false });

    images.forEach(async (image) => {
        const filePath = path.join(uploadDir, image.filename);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        await image.deleteOne(); // Use deleteOne() instead of remove()
        console.log(`Deleted unused image: ${image.filename}`);
    });
};

// Run cleanup job every 30 minutes
export const cleanupJob = () => {
    const intervalId = setInterval(deleteUnusedImages, 30 * 60 * 1000);
    return () => clearInterval(intervalId);
}


