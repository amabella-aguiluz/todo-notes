import { Sequelize } from 'sequelize';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect:'mysql',
        dialectOptions: {
            ssl:{
            rejectUnauthorized: true,
            ca: fs.readFileSync('../db/ca.pem')},
        },
        logging: false,
    }
);

// async function connectDB() {
//   try {
//     await sequelize.authenticate();
//     console.log('Database connected successfully');
//   } catch (error) {
//     console.error('Database connection failed:', error);
//     process.exit(1);
//   }
// }

// connectDB();

export default sequelize;
