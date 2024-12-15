"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexRouter = void 0;
const express_1 = require("express");
const projects_route_1 = require("./projects.route");
const messages_route_1 = require("./messages.route");
const skills_route_1 = require("./skills.route");
const router = (0, express_1.Router)();
// router.use('/auth', )
router.use('/projects', projects_route_1.ProjectsRouter);
router.use('/messages', messages_route_1.MessagesRouter);
router.use('/skills', skills_route_1.SkillsRouter);
exports.IndexRouter = router;
