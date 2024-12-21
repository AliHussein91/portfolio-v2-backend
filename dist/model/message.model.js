"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const mongoose_1 = require("mongoose");
const messageSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    phone: String,
    message: {
        type: String,
        required: true,
    },
    read: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
exports.Message = (0, mongoose_1.model)('Message', messageSchema);
