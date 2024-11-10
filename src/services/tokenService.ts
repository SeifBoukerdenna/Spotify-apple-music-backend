import jwt from "jsonwebtoken";
import fs from "fs";
import config from "@/config";

export function generateDeveloperToken(): string {
  let privateKey: Buffer;

  try {
    privateKey = fs.readFileSync(config.privateKeyPath);
  } catch (error) {
    console.error("Failed to read private key file:", error);
    throw new Error("Private key file not found");
  }

  try {
    const token = jwt.sign({}, privateKey, {
      algorithm: "ES256",
      expiresIn: config.tokenExpiresIn,
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
