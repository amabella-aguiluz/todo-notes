import dotenv from 'dotenv';
dotenv.config();


const env = {
    PORT: process.env.PORT,
    BACKEND_URL: process.env.BACKEND_URL,
    FRONTEND_URL_PROD: process.env.FRONTEND_URL_PROD,
    FRONTEND_URL_DEV: process.env.FRONTEND_URL_DEV,
    JWT_SECRET: process.env.JWT_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
};

export default env;