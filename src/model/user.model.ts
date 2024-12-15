import { Schema, model } from "mongoose"

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLenght: 8
    },
    image: {
        type: String,
        required: true,
    },
    role: {
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

export const User = model('User', userSchema)