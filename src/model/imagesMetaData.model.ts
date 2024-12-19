import { model, Schema } from 'mongoose';
import { IImageMetadata } from '../interfaces/imageMetaData.interface';



const imageMetadataSchema: Schema = new Schema({
  filename: { type: String, required: true, unique: true },
  isInUse: { type: Boolean, default: true }
});

export const ImageMetadata = model<IImageMetadata>('ImageMetadata', imageMetadataSchema);