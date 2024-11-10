"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const generateToken_1 = require("./generateToken");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.get("/getDeveloperToken", (req, res) => {
    try {
        const token = (0, generateToken_1.generateDeveloperToken)();
        res.status(200).json({ token });
    }
    catch (error) {
        console.error("Error generating token:", error);
        res.status(500).json({ error: "Failed to generate token" });
    }
});
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
