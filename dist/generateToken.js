"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDeveloperToken = generateDeveloperToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fs_1 = __importDefault(require("fs"));
const privateKeyPath = process.env.RENDER_ENV
    ? "/etc/secrets/AuthKey_8MQTX7S357.p8"
    : "./etc/secrets/AuthKey_8MQTX7S357.p8";
const teamId = "VZR89A8Z89";
const keyId = "8MQTX7S357";
function generateDeveloperToken() {
    let privateKey;
    try {
        privateKey = fs_1.default.readFileSync(privateKeyPath);
    }
    catch (error) {
        console.error("Failed to read private key file:", error);
        throw new Error("Private key file not found");
    }
    try {
        const token = jsonwebtoken_1.default.sign({}, privateKey, {
            algorithm: "ES256",
            expiresIn: "180d",
            issuer: teamId,
            header: {
                alg: "ES256",
                kid: keyId,
            },
        });
        return token;
    }
    catch (error) {
        console.error("Token generation error:", error);
        throw new Error("Token generation failed");
    }
}
