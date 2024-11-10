"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDeveloperToken = generateDeveloperToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fs_1 = __importDefault(require("fs"));
const config_1 = __importDefault(require("../config"));
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
        const token = jsonwebtoken_1.default.sign({}, privateKey, {
            algorithm: "ES256",
            expiresIn: config_1.default.tokenExpiresIn,
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
