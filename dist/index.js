"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_route_1 = require("./routes/index.route");
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const jwt_config_1 = __importDefault(require("./config/jwt.config"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const DATABASE_URL = process.env.DATABASE_URL;
const PORT = process.env.Port || 3000;
let corsOptions = {
    origin: true,
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};
// Middleware
app.use((0, cors_1.default)(corsOptions));
app.use((0, helmet_1.default)());
app.use(body_parser_1.default.json());
app.use(jwt_config_1.default.initialize());
// Routes
app.use('/api', index_route_1.IndexRouter);
// Database & API Connection
mongoose_1.default.connect(DATABASE_URL)
    .then(() => {
    console.log('Connected to database');
    // Running Server
    app.listen(PORT, () => {
        console.log(`server running on http://localhost:${PORT}`);
    });
})
    .catch((error) => console.error(`Error ${error}`));
exports.default = app;
