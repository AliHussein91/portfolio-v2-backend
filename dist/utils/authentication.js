"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jwt_config_1 = __importDefault(require("../config/jwt.config"));
exports.authenticate = jwt_config_1.default.authenticate('jwt', { session: false });
