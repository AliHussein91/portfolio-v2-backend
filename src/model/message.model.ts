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
    createdAt: {
        type: Date,
        immutable: true,
        default: () => new Date()
    },
    updatedAt: {
        type: Date,
        default: () => new Date()
    },
})

export const Message =  model('Message', messageSchema)