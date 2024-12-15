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
exports.deleteProjectById = exports.updateProjectById = exports.createProject = exports.getProjectById = exports.getProjects = void 0;
const project_model_1 = require("../model/project.model");
const mongoose_1 = require("mongoose");
const getProjects = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield project_model_1.Project.find({});
        response.status(200).json(projects);
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
exports.getProjects = getProjects;
const getProjectById = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = request.params;
        const project = yield project_model_1.Project.findById(id);
        response.status(200).json(project);
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
exports.getProjectById = getProjectById;
const createProject = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield project_model_1.Project.create(request.body);
        response.status(200).json(project);
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
exports.createProject = createProject;
const updateProjectById = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = request.params;
        const project = yield project_model_1.Project.findByIdAndUpdate(id, request.body, { new: true });
        if (!project) {
            response.status(404).json({ message: "Project not found" });
        }
        else {
            const updatedProject = yield project_model_1.Project.findById(id);
            response.status(200).json(updatedProject);
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
exports.updateProjectById = updateProjectById;
const deleteProjectById = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = request.params;
        const project = yield project_model_1.Project.findByIdAndDelete(id);
        if (!project) {
            response.status(404).json({ message: "Project not found" });
        }
        else {
            response.status(200).json({ message: "Project deleted successfuly" });
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
exports.deleteProjectById = deleteProjectById;
