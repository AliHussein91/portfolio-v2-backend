"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRouter = void 0;
const express_1 = require("express");
const users_controller_1 = require("../controllers/users.controller");
const authentication_1 = require("../utils/authentication");
const router = (0, express_1.Router)();
router.use(authentication_1.authenticate);
router.get('/', users_controller_1.getUsers);
router.get('/:id', users_controller_1.getUserById);
router.post('/', users_controller_1.createUser);
router.put('/:id', users_controller_1.updateUserById);
router.delete('/:id', users_controller_1.deleteUserById);
exports.UsersRouter = router;
