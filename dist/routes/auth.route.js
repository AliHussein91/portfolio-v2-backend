"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const authentication_1 = require("../utils/authentication");
const auth_controller_2 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
// Register a new user
router.post('/register', authentication_1.authenticate, auth_controller_1.registerUser);
// Login and generate JWT
router.post('/login', auth_controller_1.loginUser);
// Logout and blacklist token
router.post('/logout', authentication_1.authenticate, auth_controller_2.logoutUser);
exports.AuthRouter = router;
