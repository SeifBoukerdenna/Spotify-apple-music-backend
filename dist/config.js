"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const isRenderEnv = process.env.RENDER_ENV === "true";
console.log(`Running in ${isRenderEnv ? "Render" : "Local"} environment`);
const config = {
    privateKeyPath: isRenderEnv
        ? "/etc/secrets/AuthKey_8MQTX7S357.p8" // Absolute path for Render
        : path_1.default.resolve(__dirname, "../etc/secrets/AuthKey_8MQTX7S357.p8"), // Local path in root
    teamId: process.env.TEAM_ID || "VZR89A8Z89",
    keyId: process.env.KEY_ID || "8MQTX7S357",
    tokenExpiresIn: "180d",
};
exports.default = config;
