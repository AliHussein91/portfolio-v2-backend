import { Schema, model } from "mongoose"

const skillSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    image: {
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

export const Skill =  model('Skill', skillSchema)