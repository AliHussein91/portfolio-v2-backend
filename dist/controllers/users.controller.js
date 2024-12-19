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
exports.deleteUserById = exports.updateUserById = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const user_model_1 = require("../model/user.model");
const mongoose_1 = require("mongoose");
const getUsers = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.User.find({});
        response.status(200).json(users);
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
exports.getUsers = getUsers;
const getUserById = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = request.params;
        const user = yield user_model_1.User.findById(id);
        response.status(200).json(user);
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
exports.getUserById = getUserById;
const createUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.User.create(request.body);
        response.status(200).json(user);
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
exports.createUser = createUser;
const updateUserById = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = request.params;
        const user = yield user_model_1.User.findByIdAndUpdate(id, request.body, { new: true });
        if (!user) {
            response.status(404).json({ message: "User not found" });
        }
        else {
            const updatedUser = yield user_model_1.User.findById(id);
            response.status(200).json(updatedUser);
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
exports.updateUserById = updateUserById;
const deleteUserById = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = request.params;
        const user = yield user_model_1.User.findByIdAndDelete(id);
        if (!user) {
            response.status(404).json({ message: "User not found" });
        }
        else {
            response.status(200).json({ message: "User deleted successfuly" });
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
exports.deleteUserById = deleteUserById;
