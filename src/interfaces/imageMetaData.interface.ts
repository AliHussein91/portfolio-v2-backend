import { Document } from 'mongoose';

export interface IImageMetadata extends Document {
    filename: string;
    isInUse: boolean;
}
