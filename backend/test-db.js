import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

async function testConnection() {
  try {
    const connection = await mysql.createConnection(process.env.DATABASE_URL);

    const [rows] = await connection.query("SELECT 1 + 1 AS result");

    console.log("Database connected!");
    console.log("Query result:", rows);

    await connection.end();
  } catch (error) {
    console.error("Database connection failed:");
    console.error(error.message);
  }
}

testConnection();
