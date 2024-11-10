import path from "path";

const isRenderEnv = process.env.RENDER_ENV === "true";

console.log(`Running in ${isRenderEnv ? "Render" : "Local"} environment`);

const config = {
  privateKeyPath: isRenderEnv
    ? "/etc/secrets/AuthKey_8MQTX7S357.p8"
    : path.resolve(__dirname, "../etc/secrets/AuthKey_8MQTX7S357.p8"),

  // Other configuration options
  teamId: process.env.TEAM_ID || "VZR89A8Z89",
  keyId: process.env.KEY_ID || "8MQTX7S357",
  tokenExpiresIn: "180d",
};

export default config;
