import { configDotenv } from "dotenv";

configDotenv();

export const PORT = process.env.PORT;
export const mongoURI = process.env.MONGODB_URI;
export const RESEND_API_KEY = process.env.RESEND_API_KEY;