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
}, { timestamps: true })

export const Skill =  model('Skill', skillSchema)