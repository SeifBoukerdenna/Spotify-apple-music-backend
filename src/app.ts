import express, { Request, Response } from "express";
import { generateDeveloperToken } from "./generateToken";

const app = express();
const port = process.env.PORT || 3000;

app.get("/getDeveloperToken", (req: Request, res: Response) => {
  try {
    const token = generateDeveloperToken();
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error generating token:", error);
    res.status(500).json({ error: "Failed to generate token" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
