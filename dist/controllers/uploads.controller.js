"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkNotInUse = exports.getImages = exports.markInUse = exports.uploadImage = void 0;
const imagesMetaData_model_1 = require("../model/imagesMetaData.model");
const mongoose_1 = require("mongoose");
const upload_1 = require("../utils/upload");
const path_1 = __importDefault(require("path"));
const uploadImage = (request, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    upload_1.upload.single('image')(request, res, (error) => __awaiter(void 0, void 0, void 0, function* () {
        if (error) {
            return res.status(400).json({ "message": error.message });
        }
        if (!request.file) {
            return res.status(400).json({ "message": 'No file uploaded' });
        }
        try {
            const imageMetadata = new imagesMetaData_model_1.ImageMetadata({
                filename: request.file.filename,
                isInUse: true
            });
            yield imageMetadata.save();
            // get the image path and send it back to the client
            const fileUrl = path_1.default.join('https://myportfolio-ewtufvor.b4a.run/', `images/${request.file.filename}`);
            res.json({ fileUrl });
        }
        catch (error) {
            next(error);
        }
    }));
});
exports.uploadImage = uploadImage;
const markInUse = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { filename } = request.params;
    try {
        const image = yield imagesMetaData_model_1.ImageMetadata.findOne({ filename });
        if (image) {
            image.isInUse = true;
            yield image.save();
            response.send('Image marked as in use');
        }
        else {
            response.status(404).json({ "message": 'Image not found' });
        }
    }
    catch (error) {
        if (error instanceof mongoose_1.MongooseError) {
            response.status(500).json({ message: error.message });
        }
        else {
            response.status(500).json(error);
        }
    }
});
exports.markInUse = markInUse;
const getImages = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const images = yield imagesMetaData_model_1.ImageMetadata.find({});
        response.status(200).json(images);
    }
    catch (error) {
        if (error instanceof mongoose_1.MongooseError) {
            response.status(500).json({ message: error.message });
        }
        else {
            response.status(500).json(error);
        }
    }
});
exports.getImages = getImages;
const MarkNotInUse = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { filename } = request.params;
    try {
        const image = yield imagesMetaData_model_1.ImageMetadata.findOne({ filename });
        if (image) {
            image.isInUse = false;
            yield image.save();
            response.send('Image marked as not in use');
        }
        else {
            response.status(404).json({ "message": 'Image not found' });
        }
    }
    catch (error) {
        if (error instanceof mongoose_1.MongooseError) {
            response.status(500).json({ message: error.message });
        }
        else {
            response.status(500).json(error);
        }
    }
});
exports.MarkNotInUse = MarkNotInUse;
