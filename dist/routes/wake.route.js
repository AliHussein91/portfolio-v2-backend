"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WakeRouter = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.status(200).json({ 'message': 'Server is awake!' });
});
exports.WakeRouter = router;
