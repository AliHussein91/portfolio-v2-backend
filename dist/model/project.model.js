"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const mongoose_1 = require("mongoose");
const projectSchema = new mongoose_1.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    skills: [String],
    nameAr: {
        type: String,
        required: true
    },
    descriptionAr: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    image: {
        type: String,
        required: true
    },
    link: String,
}, { timestamps: true });
exports.Project = (0, mongoose_1.model)('Project', projectSchema);
