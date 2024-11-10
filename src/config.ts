import path from "path";
import dotenv from "dotenv";

dotenv.config();

const isRenderEnv = process.env.RENDER_ENV === "true";

console.log(`Running in ${isRenderEnv ? "Render" : "Local"} environment`);

const config = {
  privateKeyPath: isRenderEnv
    ? "/etc/secrets/AuthKey_8MQTX7S357.p8" // Absolute path for Render
    : path.resolve(__dirname, "../etc/secrets/AuthKey_8MQTX7S357.p8"), // Local path in root
  teamId: process.env.TEAM_ID || "VZR89A8Z89",
  keyId: process.env.KEY_ID || "8MQTX7S357",
  tokenExpiresIn: "180d",
};

export default config;
