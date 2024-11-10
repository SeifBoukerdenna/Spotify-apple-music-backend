import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

const privateKeyPath = path.join(__dirname, "./scripts/AuthKey_8MQTX7S357.p8");
const privateKey = fs.readFileSync(privateKeyPath, "utf8");
const teamId = "VZR89A8Z89";
const keyId = "8MQTX7S357";

export function generateDeveloperToken(): string {
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
