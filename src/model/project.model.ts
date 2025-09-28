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
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    featured: {
        type: Boolean,
        required: true,
        default: false
    },
    image: {
        type: String,
        required: true
    },
    link: String,
}, { timestamps: true })

export const Project = model('Project', projectSchema)