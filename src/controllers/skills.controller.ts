import { Request, Response } from "express-serve-static-core";
import { Skill } from "../model/skill.model";
import { MongooseError } from "mongoose";

export const getSkills = async (request: Request, response: Response) => {
    try {
        const skills = await Skill.find({})
        response.status(200).json(skills)
    } catch (error) {
        if (error instanceof MongooseError) {
            response.status(500).json({ message: error.message })
        } else {
            response.status(500).json(error)
        }
    }
}

export const getSkillById = async (request: Request, response: Response) => {
    try {
        const { id } = request.params
        const skill = await Skill.findById(id)
        response.status(200).json(skill)
    } catch (error) {
        if (error instanceof MongooseError) {
            response.status(500).json({ message: error.message })
        } else {
            response.status(500).json(error)
        }
    }
}

export const createSkill = async (request: Request, response: Response) => {
    try {
        const skill = await Skill.create(request.body)
        response.status(200).json(skill)
    } catch (error) {
        if (error instanceof MongooseError) {
            response.status(500).json({ message: error.message })
        } else {
            response.status(500).json(error)
        }
    }
}

export const updateSkillById = async (request: Request, response: Response) => {
    try {
        const { id } = request.params
        const skill = await Skill.findByIdAndUpdate(id, request.body, { new: true })
        if (!skill) {
            response.status(404).json({ message: "Skill not found" })
        } else {
            const updatedSkill = await Skill.findById(id)
            response.status(200).json(updatedSkill)
        }
    } catch (error) {
        if (error instanceof MongooseError) {
            response.status(500).json({ message: error.message })
        } else {
            response.status(500).json(error)
        }
    }
}

export const deleteSkillById = async (request: Request, response: Response) => {
    try {
        const { id } = request.params
        const skill = await Skill.findByIdAndDelete(id)
        if (!skill) {
            response.status(404).json({ message: "Skill not found" })
        } else {
            response.status(200).json({ message: "Skill deleted successfuly" })
        }
    } catch (error) {
        if (error instanceof MongooseError) {
            response.status(500).json({ message: error.message })
        } else {
            response.status(500).json(error)
        }
    }
}