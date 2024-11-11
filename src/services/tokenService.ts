import jwt from "jsonwebtoken";
import fs from "fs";
import config from "@/config";

/**
 * Generates a unique payload for each request.
 * @returns {Object} - A unique payload containing a timestamp and a random string.
 */
function createUniquePayload() {
  return {
    timestamp: Date.now(),
    random: Math.random().toString(36).substring(2),
  };
}

/**
 * Generates a developer token signed with the private key.
 * @throws {Error} - If the private key file is not found or if token generation fails.
 * @returns {string} - A JSON Web Token (JWT) signed with the ES256 algorithm.
 */
export function generateDeveloperToken(): string {
  let privateKey: Buffer;

  try {
    // Read private key file from specified path in configuration
    privateKey = fs.readFileSync(config.privateKeyPath);
  } catch (error) {
    console.error("Failed to read private key file:", error);
    throw new Error("Private key file not found");
  }

  try {
    // Generate payload and sign with private key
    const payload = createUniquePayload();
    const token = jwt.sign(payload, privateKey, {
      algorithm: "ES256",
      expiresIn: "30s", // Token valid for 30 seconds
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
