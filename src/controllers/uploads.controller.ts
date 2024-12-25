import { NextFunction, Request, Response } from "express-serve-static-core";
import { ImageMetadata } from "../model/imagesMetaData.model";
import { MongooseError } from "mongoose";
import { upload } from '../utils/upload';
import path from 'path';

export const uploadImage = async (request: Request, res: Response, next: NextFunction) => {
    upload.single('image')
        (request, res, async (error) => {
            if (error) {
                return res.status(400).json({ "message": error.message });
            }

            if (!request.file) {
                return res.status(400).json({ "message": 'No file uploaded' });
            }

            try {
                const imageMetadata = new ImageMetadata({
                    filename: request.file.filename,
                    isInUse: true
                });

                await imageMetadata.save();
                // get the image path and send it back to the client
                const fileUrl = path.join(__dirname, `/public/imgs/${request.file.filename}`);
                res.json({ fileUrl });
            } catch (error) {
                next(error);
            }
        });
};

export const markInUse = async (request: Request, response: Response) => {
    const { filename } = request.params;
    try {
        const image = await ImageMetadata.findOne({ filename });

        if (image) {
            image.isInUse = true;
            await image.save();
            response.send('Image marked as in use');
        } else {
            response.status(404).json({ "message": 'Image not found' });
        }
    } catch (error) {
        if (error instanceof MongooseError) {
            response.status(500).json({ message: error.message })
        } else {
            response.status(500).json(error)
        }
    }
}

export const getImages = async (request: Request, response: Response) => {
    try {
        const images = await ImageMetadata.find({})
        response.status(200).json(images)
    } catch (error) {
        if (error instanceof MongooseError) {
            response.status(500).json({ message: error.message })
        } else {
            response.status(500).json(error)
        }
    }
}