import { Schema, model } from "mongoose"


const messageSchema = new Schema({
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
}, { timestamps: true })

export const Message =  model('Message', messageSchema)