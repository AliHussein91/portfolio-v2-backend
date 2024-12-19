"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageMetadata = void 0;
const mongoose_1 = require("mongoose");
const imageMetadataSchema = new mongoose_1.Schema({
    filename: { type: String, required: true, unique: true },
    isInUse: { type: Boolean, default: true }
});
exports.ImageMetadata = (0, mongoose_1.model)('ImageMetadata', imageMetadataSchema);
