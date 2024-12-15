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
exports.deleteSkillById = exports.updateSkillById = exports.createSkill = exports.getSkillById = exports.getSkills = void 0;
const skill_model_1 = require("../model/skill.model");
const mongoose_1 = require("mongoose");
const getSkills = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skills = yield skill_model_1.Skill.find({});
        response.status(200).json(skills);
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
exports.getSkills = getSkills;
const getSkillById = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = request.params;
        const skill = yield skill_model_1.Skill.findById(id);
        response.status(200).json(skill);
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
exports.getSkillById = getSkillById;
const createSkill = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skill = yield skill_model_1.Skill.create(request.body);
        response.status(200).json(skill);
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
exports.createSkill = createSkill;
const updateSkillById = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = request.params;
        const skill = yield skill_model_1.Skill.findByIdAndUpdate(id, request.body, { new: true });
        if (!skill) {
            response.status(404).json({ message: "Skill not found" });
        }
        else {
            const updatedSkill = yield skill_model_1.Skill.findById(id);
            response.status(200).json(updatedSkill);
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
exports.updateSkillById = updateSkillById;
const deleteSkillById = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = request.params;
        const skill = yield skill_model_1.Skill.findByIdAndDelete(id);
        if (!skill) {
            response.status(404).json({ message: "Skill not found" });
        }
        else {
            response.status(200).json({ message: "Skill deleted successfuly" });
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
exports.deleteSkillById = deleteSkillById;
