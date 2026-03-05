import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRouter from "./routes/auth.routes.js";
import notesRouter from "./routes/notes.routes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);   
app.use("/notes", notesRouter);

app.use((req, res) => {
  console.log("Unmatched route:", req.method, req.url);
  res.status(404).send(`Cannot ${req.method} ${req.url}`);
});

export default app;