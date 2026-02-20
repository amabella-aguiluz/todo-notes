import express from "express";
import path from "path";
import cors, { CorsOptions } from "cors";
import env from "./config/env";

import authRoutes from "./routes/auth.routes";
import noteRoutes from "./routes/notes.routes"; // adjust filename/path if needed
// import routes from "./routes";

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "..", "public")));

const corsOptions: CorsOptions = {
  origin: [
    env.FRONTEND_URL_DEV || "http://localhost:5173",
    env.FRONTEND_URL_PROD || "http://localhost:5173",
  ],
  credentials: false,
};

// ✅ This is critical to parse JSON bodies
app.use(express.json()); // connect to express
app.use("/api/auth", authRoutes); // route to auth functions
app.use("/api/notes", noteRoutes); // route to note functions

app.use(cors(corsOptions));
// app.use("/api/v1", routes);


app.get("/", (_req, res) => {
  return res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

export default app;
