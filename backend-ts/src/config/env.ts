import dotenv from "dotenv";
dotenv.config();


const env = {
    PORT: process.env.PORT,
    BACKEND_URL: process.env.BACKEND_URL,
    FRONTEND_URL_PROD: process.env.FRONTEND_URL_PROD,
    FRONTEND_URL_DEV: process.env.FRONTEND_URL_DEV,
<<<<<<< HEAD
=======
    JWT_SECRET: process.env.JWT_SECRET
>>>>>>> d23a76f55ae530477bcd5025d0600cab91740e4e
};

export default env;