import { Schema, model } from "mongoose"
import { Skill } from './skill.model'

const projectSchema = new Schema({
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
    image: {
        type: String,
        required: true
    },
    link: String,
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

export const Project = model('Project', projectSchema)