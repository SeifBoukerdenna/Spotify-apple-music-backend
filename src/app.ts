import express from "express";
import tokenRoutes from "@/routes/tokenRoutes";

const app = express();
const port = process.env.PORT || 3000;

// Setup routes and other configurations here
app.use("/api", tokenRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default app;
