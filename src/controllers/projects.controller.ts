import { Request, Response } from "express-serve-static-core";
import { Project } from "../model/project.model";
import { MongooseError } from "mongoose";

export const getProjects = async (request: Request, response: Response) => {
    try {
        const projects = await Project.find({})
        response.status(200).json(projects)
    } catch (error) {
        if (error instanceof MongooseError) {
            response.status(500).json({ message: error.message })
        } else {
            response.status(500).json(error)
        }
    }
}

export const getProjectById = async (request: Request, response: Response) => {
    try {
        const { id } = request.params
        const project = await Project.findById(id)
        response.status(200).json(project)
    } catch (error) {
        if (error instanceof MongooseError) {
            response.status(500).json({ message: error.message })
        } else {
            response.status(500).json(error)
        }
    }
}

export const createProject = async (request: Request, response: Response) => {
    try {
        const project = await Project.create(request.body)
        response.status(200).json(project)
    } catch (error) {
        if (error instanceof MongooseError) {
            response.status(500).json({ message: error.message })
        } else {
            response.status(500).json(error)
        }
    }
}

export const updateProjectById = async (request: Request, response: Response) => {
    try {
        const { id } = request.params
        const project = await Project.findByIdAndUpdate(id, request.body, { new: true })
        if (!project) {
            response.status(404).json({ message: "Project not found" })
        } else {
            const updatedProject = await Project.findById(id)
            response.status(200).json(updatedProject)
        }
    } catch (error) {
        if (error instanceof MongooseError) {
            response.status(500).json({ message: error.message })
        } else {
            response.status(500).json(error)
        }
    }
}

export const deleteProjectById = async (request: Request, response: Response) => {
    try {
        const { id } = request.params
        const project = await Project.findByIdAndDelete(id)
        if (!project) {
            response.status(404).json({ message: "Project not found" })
        } else {
            response.status(200).json({ message: "Project deleted successfuly" })
        }
    } catch (error) {
        if (error instanceof MongooseError) {
            response.status(500).json({ message: error.message })
        } else {
            response.status(500).json(error)
        }
    }
}