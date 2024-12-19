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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const user_model_1 = require("../model/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
const blacklist_model_1 = require("../model/blacklist.model");
dotenv_1.default.config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, image, email, role } = req.body;
        const user = new user_model_1.User({ username, password, image, email, role });
        yield user.save();
        res.status(201).json({ message: 'User registered' });
    }
    catch (error) {
        res.status(400).json({ error: error, massage: 'Error registering user' });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_model_1.User.findOne({ email });
    if (user && (yield bcryptjs_1.default.compare(password, user.password))) {
        const payload = { sub: user._id, role: user.role };
        const token = jsonwebtoken_1.default.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        res.json({ token });
    }
    else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});
exports.loginUser = loginUser;
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return;
    }
    else {
        try {
            const blacklist = new blacklist_model_1.Blacklist({ token });
            yield blacklist.save();
            res.status(200).json({ message: 'Logged out successfully' });
        }
        catch (error) {
            res.status(400).json({ error: error, message: 'Error logging out' });
        }
    }
});
exports.logoutUser = logoutUser;
