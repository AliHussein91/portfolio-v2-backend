"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WakeRouter = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/wake', (req, res) => {
    res.send('Awake!');
});
exports.WakeRouter = router;
