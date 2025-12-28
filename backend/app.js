// configure express, middleware, routes

import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import noteRoutes from "./routes/notes.routes.js"; // adjust filename/path if needed
import cors from 'cors'; // frontend

dotenv.config();
const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
//frontend
// app.use(cors({
//     origin: frontend,
//     credentials:true 
// }));


export default app;
