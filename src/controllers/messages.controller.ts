import { Request, Response } from "express-serve-static-core";
import { Message } from "../model/message.model";
import { MongooseError } from "mongoose";

export const getMessages = async (request: Request, response: Response) => {
    try {
        const messages = await Message.find({})
        response.status(200).json(messages)
    } catch (error) {
        if (error instanceof MongooseError) {
            response.status(500).json({ message: error.message })
        } else {
            response.status(500).json(error)
        }
    }
}

export const getMessageById = async (request: Request, response: Response) => {
    try {
        const { id } = request.params
        const message = await Message.findById(id)
        response.status(200).json(message)
    } catch (error) {
        if (error instanceof MongooseError) {
            response.status(500).json({ message: error.message })
        } else {
            response.status(500).json(error)
        }
    }
}

export const createMessage = async (request: Request, response: Response) => {
    try {
        const message = await Message.create(request.body)
        response.status(200).json(message)
    } catch (error) {
        if (error instanceof MongooseError) {
            response.status(500).json({ message: error.message })
        } else {
            response.status(500).json(error)
        }
    }
}

export const deleteMessageById = async (request: Request, response: Response) => {
    try {
        const { id } = request.params
        const message = await Message.findByIdAndDelete(id)
        if (!message) {
            response.status(404).json({ message: "Message not found" })
        } else {
            response.status(200).json({ message: "Message deleted successfuly" })
        }
    } catch (error) {
        if (error instanceof MongooseError) {
            response.status(500).json({ message: error.message })
        } else {
            response.status(500).json(error)
        }
    }
}
export const markAsRead = async (request: Request, response: Response) => {
    try {
        const { id } = request.params
        const message = await Message.findByIdAndUpdate(id, { read: true })
        if (!message) {
            response.status(404).json({ message: "Message not found" })
        } else {
            response.status(200).json(message)
        }
    } catch (error) {
        if (error instanceof MongooseError) {
            response.status(500).json({ message: error.message })
        } else {
            response.status(500).json(error)
        }
    }
}
export const markAsUnread = async (request: Request, response: Response) => {
    try {
        const { id } = request.params
        const message = await Message.findByIdAndUpdate(id, { read: false })
        if (!message) {
            response.status(404).json({ message: "Message not found" })
        } else {
            response.status(200).json(message)
        }
    } catch (error) {
        if (error instanceof MongooseError) {
            response.status(500).json({ message: error.message })
        } else {
            response.status(500).json(error)
        }
    }
}