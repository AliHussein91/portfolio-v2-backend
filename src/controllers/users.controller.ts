import { Request, Response } from "express-serve-static-core";
import { User } from "../model/user.model";
import { MongooseError } from "mongoose";

export const getUsers = async (request: Request, response: Response) => {
    try {
        const users = await User.find({})
        response.status(200).json(users)
    } catch (error) {
        if (error instanceof MongooseError) {
            response.status(500).json({ message: error.message })
        } else {
            response.status(500).json(error)
        }
    }
}

export const getUserById = async (request: Request, response: Response) => {
    try {
        const { id } = request.params
        const user = await User.findById(id)
        response.status(200).json(user)
    } catch (error) {
        if (error instanceof MongooseError) {
            response.status(500).json({ message: error.message })
        } else {
            response.status(500).json(error)
        }
    }
}

export const createUser = async (request: Request, response: Response) => {
    try {
        const user = await User.create(request.body)
        response.status(200).json(user)
    } catch (error) {
        if (error instanceof MongooseError) {
            response.status(500).json({ message: error.message })
        } else {
            response.status(500).json(error)
        }
    }
}

export const updateUserById = async (request: Request, response: Response) => {
    try {
        const { id } = request.params
        const user = await User.findByIdAndUpdate(id, request.body, { new: true })
        if (!user) {
            response.status(404).json({ message: "User not found" })
        } else {
            const updatedUser = await User.findById(id)
            response.status(200).json(updatedUser)
        }
    } catch (error) {
        if (error instanceof MongooseError) {
            response.status(500).json({ message: error.message })
        } else {
            response.status(500).json(error)
        }
    }
}

export const deleteUserById = async (request: Request, response: Response) => {
    try {
        const { id } = request.params
        const user = await User.findByIdAndDelete(id)
        if (!user) {
            response.status(404).json({ message: "User not found" })
        } else {
            response.status(200).json({ message: "User deleted successfuly" })
        }
    } catch (error) {
        if (error instanceof MongooseError) {
            response.status(500).json({ message: error.message })
        } else {
            response.status(500).json(error)
        }
    }
}