"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_route_1 = require("./routes/index.route");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const DATABASE_URL = process.env.DATABASE_URL;
const PORT = process.env.Port || 3000;
let corsOptions = {
    origin: ['http://localhost:4200', 'http:/localhost'],
};
// Middleware
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
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
