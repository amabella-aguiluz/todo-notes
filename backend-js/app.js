// configure express, middleware, routes

import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import noteRoutes from "./routes/notes.routes.js"; // adjust filename/path if needed
import cors from 'cors'; // frontend

dotenv.config();
const app = express();

app.use(express.json()); // connect to express
app.use("/api/auth", authRoutes); // route to auth functions
app.use("/api/notes", noteRoutes); // route to note functions
//frontend
// app.use(cors({
//     origin: frontend,
//     credentials:true 
// }));


export default app;
