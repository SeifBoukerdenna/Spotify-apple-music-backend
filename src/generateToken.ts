// src/generateToken.ts
import jwt from "jsonwebtoken";

const privateKey = process.env.PRIVATE_KEY || "";
const teamId = "VZR89A8Z89";
const keyId = "8MQTX7S357";

export function generateDeveloperToken(): string {
  if (!privateKey) {
    throw new Error("Private key is not set in environment variables");
  }

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
}
