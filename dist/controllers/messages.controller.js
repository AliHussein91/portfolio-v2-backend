"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMessageById = exports.updateMessageById = exports.createMessage = exports.getMessageById = exports.getMessages = void 0;
const message_model_1 = require("../model/message.model");
const mongoose_1 = require("mongoose");
const getMessages = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messages = yield message_model_1.Message.find({});
        response.status(200).json(messages);
    }
    catch (error) {
        if (error instanceof mongoose_1.MongooseError) {
            response.status(500).json({ message: error.message });
        }
        else {
            response.status(500).json(error);
        }
    }
});
exports.getMessages = getMessages;
const getMessageById = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = request.params;
        const message = yield message_model_1.Message.findById(id);
        response.status(200).json(message);
    }
    catch (error) {
        if (error instanceof mongoose_1.MongooseError) {
            response.status(500).json({ message: error.message });
        }
        else {
            response.status(500).json(error);
        }
    }
});
exports.getMessageById = getMessageById;
const createMessage = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const message = yield message_model_1.Message.create(request.body);
        response.status(200).json(message);
    }
    catch (error) {
        if (error instanceof mongoose_1.MongooseError) {
            response.status(500).json({ message: error.message });
        }
        else {
            response.status(500).json(error);
        }
    }
});
exports.createMessage = createMessage;
const updateMessageById = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = request.params;
        const message = yield message_model_1.Message.findByIdAndUpdate(id, request.body, { new: true });
        if (!message) {
            response.status(404).json({ message: "Message not found" });
        }
        else {
            const updatedMessage = yield message_model_1.Message.findById(id);
            response.status(200).json(updatedMessage);
        }
    }
    catch (error) {
        if (error instanceof mongoose_1.MongooseError) {
            response.status(500).json({ message: error.message });
        }
        else {
            response.status(500).json(error);
        }
    }
});
exports.updateMessageById = updateMessageById;
const deleteMessageById = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = request.params;
        const message = yield message_model_1.Message.findByIdAndDelete(id);
        if (!message) {
            response.status(404).json({ message: "Message not found" });
        }
        else {
            response.status(200).json({ message: "Message deleted successfuly" });
        }
    }
    catch (error) {
        if (error instanceof mongoose_1.MongooseError) {
            response.status(500).json({ message: error.message });
        }
        else {
            response.status(500).json(error);
        }
    }
});
exports.deleteMessageById = deleteMessageById;
