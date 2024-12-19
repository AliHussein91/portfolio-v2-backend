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
exports.deleteUnusedImages = void 0;
const path_1 = __importDefault(require("path"));
const imagesMetaData_model_1 = require("../model/imagesMetaData.model");
const fs_1 = __importDefault(require("fs"));
const uploadDir = path_1.default.join(__dirname, 'public', 'imgs');
// Cleanup job
const deleteUnusedImages = () => __awaiter(void 0, void 0, void 0, function* () {
    const images = yield imagesMetaData_model_1.ImageMetadata.find({ isInUse: false });
    images.forEach((image) => __awaiter(void 0, void 0, void 0, function* () {
        const filePath = path_1.default.join(uploadDir, image.filename);
        if (fs_1.default.existsSync(filePath)) {
            fs_1.default.unlinkSync(filePath);
        }
        yield image.deleteOne(); // Use deleteOne() instead of remove()
        console.log(`Deleted unused image: ${image.filename}`);
    }));
});
exports.deleteUnusedImages = deleteUnusedImages;
