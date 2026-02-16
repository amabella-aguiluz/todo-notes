// configure express, middleware, routes

import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import noteRoutes from "./routes/notes.routes.js"; // adjust filename/path if needed
import cors from 'cors'; // frontend

dotenv.config();
const app = express();

// Enable JSON body parsing
app.use(express.json());

// Enable CORS for your frontend (Vite dev server)
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// **Mount your auth routes at /api**
app.use("/api", authRoutes);

// Start server
app.listen(3000, () => {
  console.log("Backend running on http://localhost:3000");
});


export default app;
