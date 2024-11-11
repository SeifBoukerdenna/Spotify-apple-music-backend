import express from "express";
import cors from "cors"; // Import the cors package
import tokenRoutes from "@/routes/tokenRoutes";

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Define allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://spotify-to-apple-music-three.vercel.app",
];

// CORS configuration options
interface CorsOptions {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => void;
  methods: string;
  credentials: boolean;
}

const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      // If the origin is in the allowed list, allow the request
      callback(null, true);
    } else {
      // If the origin is not allowed, reject the request
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allowed HTTP methods
  credentials: true, // Allow cookies and other credentials
};

// Apply the CORS middleware to all incoming requests
app.use(cors(corsOptions));

// If you want to enable CORS for specific routes only, you can apply it like this:
// app.use("/api", cors(corsOptions), tokenRoutes);

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
