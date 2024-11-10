import jwt from "jsonwebtoken";
import fs from "fs";

const privateKeyPath = process.env.RENDER_ENV
  ? "/etc/secrets/AuthKey_8MQTX7S357.p8"
  : "./etc/secrets/AuthKey_8MQTX7S357.p8";

const teamId = "VZR89A8Z89";
const keyId = "8MQTX7S357";

export function generateDeveloperToken(): string {
  let privateKey: Buffer;
  try {
    privateKey = fs.readFileSync(privateKeyPath);
  } catch (error) {
    console.error("Failed to read private key file:", error);
    throw new Error("Private key file not found");
  }

  try {
    const token = jwt.sign({}, privateKey, {
      algorithm: "ES256",
      expiresIn: "180d",
      issuer: teamId,
      header: {
        alg: "ES256",
        kid: keyId,
      },
    });
    return token;
  } catch (error) {
    console.error("Token generation error:", error);
    throw new Error("Token generation failed");
  }
}
