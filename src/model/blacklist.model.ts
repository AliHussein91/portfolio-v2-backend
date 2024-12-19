import { Schema, model } from "mongoose";

const blacklistSchema = new Schema({
    token: {
        type: String,
        required: true
    }
});

export const Blacklist = model('Blacklist', blacklistSchema);