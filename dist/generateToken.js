"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDeveloperToken = generateDeveloperToken;
// src/generateToken.ts
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const privateKey = process.env.PRIVATE_KEY || "";
const teamId = "VZR89A8Z89";
const keyId = "8MQTX7S357";
function generateDeveloperToken() {
    if (!privateKey) {
        throw new Error("Private key is not set in environment variables");
    }
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
