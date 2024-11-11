import jwt from "jsonwebtoken";
import fs from "fs";
import config from "@/config";

// Generate a new, unique payload for each request
function createUniquePayload() {
  return {
    timestamp: Date.now(),
    random: Math.random().toString(36).substring(2),
  };
}

export function generateDeveloperToken(): string {
  let privateKey: Buffer;

  try {
    privateKey = fs.readFileSync(config.privateKeyPath);
  } catch (error) {
    console.error("Failed to read private key file:", error);
    throw new Error("Private key file not found");
  }

  try {
    const payload = createUniquePayload();
    const token = jwt.sign(payload, privateKey, {
      algorithm: "ES256",
      expiresIn: "30s", // Token valid for only 1 minute
      issuer: config.teamId,
      header: {
        alg: "ES256",
        kid: config.keyId,
      },
    });
    return token;
  } catch (error) {
    console.error("Token generation error:", error);
    throw new Error("Token generation failed");
  }
}
