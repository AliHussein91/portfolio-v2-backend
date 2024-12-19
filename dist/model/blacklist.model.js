"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blacklist = void 0;
const mongoose_1 = require("mongoose");
const blacklistSchema = new mongoose_1.Schema({
    token: {
        type: String,
        required: true
    }
});
exports.Blacklist = (0, mongoose_1.model)('Blacklist', blacklistSchema);
