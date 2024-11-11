import express from "express";
import tokenRoutes from "@/routes/tokenRoutes";

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Route setup
app.use("/api", tokenRoutes);

/**
 * Start server.
 * Log the server URL upon successful startup.
 */
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default app;
