import app from "./app.js";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import sequelize from "./config/db.js";
import apiLimiter from './middlewares/rateLimiter.js';


dotenv.config();

app.use(cors());
app.use('/api/', apiLimiter); // applies to all /api routes
app.use(express.json());



// Sync DB and start server
sequelize.sync()
  .then(() => {
    console.log('Database synced successfully');
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Server started on port ${port}`));
  })
  .catch((err) => console.error('DB sync failed:', err));


