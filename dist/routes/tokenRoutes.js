"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tokenService_1 = require("../services/tokenService");
const router = express_1.default.Router();
router.get("/getDeveloperToken", (req, res) => {
    try {
        const token = (0, tokenService_1.generateDeveloperToken)();
        res.status(200).json({ token });
    }
    catch (error) {
        console.error("Error generating token:", error);
        res.status(500).json({ error: "Failed to generate token" });
    }
});
exports.default = router;
