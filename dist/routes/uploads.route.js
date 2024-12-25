"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadsRouter = void 0;
const express_1 = require("express");
const uploads_controller_1 = require("../controllers/uploads.controller");
const authentication_1 = require("../utils/authentication");
const router = (0, express_1.Router)();
router.use(authentication_1.authenticate);
// Get Images Meta Data
router.get('/', uploads_controller_1.getImages);
// Upload endpoint
router.post('/', uploads_controller_1.uploadImage);
// Mark image as in use
router.put('/use/:filename', uploads_controller_1.markInUse);
// Mark image as not in use
router.put('/unuse/:filename', uploads_controller_1.markInUse);
exports.UploadsRouter = router;
