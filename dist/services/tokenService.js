"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDeveloperToken = generateDeveloperToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fs_1 = __importDefault(require("fs"));
const config_1 = __importDefault(require("../config"));
// Generate a new, unique payload for each request
function createUniquePayload() {
    return {
        timestamp: Date.now(),
        random: Math.random().toString(36).substring(2),
    };
}
function generateDeveloperToken() {
    let privateKey;
    try {
        privateKey = fs_1.default.readFileSync(config_1.default.privateKeyPath);
    }
    catch (error) {
        console.error("Failed to read private key file:", error);
        throw new Error("Private key file not found");
    }
    try {
        const payload = createUniquePayload();
        const token = jsonwebtoken_1.default.sign(payload, privateKey, {
            algorithm: "ES256",
            expiresIn: "30s", // Token valid for only 1 minute
            issuer: config_1.default.teamId,
            header: {
                alg: "ES256",
                kid: config_1.default.keyId,
            },
        });
        return token;
    }
    catch (error) {
        console.error("Token generation error:", error);
        throw new Error("Token generation failed");
    }
}
