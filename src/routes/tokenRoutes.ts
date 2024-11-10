import express, { Request, Response } from "express";
import { generateDeveloperToken } from "@/services/tokenService";

const router = express.Router();

router.get("/getDeveloperToken", (req: Request, res: Response) => {
  try {
    const token = generateDeveloperToken();
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error generating token:", error);
    res.status(500).json({ error: "Failed to generate token" });
  }
});

export default router;
