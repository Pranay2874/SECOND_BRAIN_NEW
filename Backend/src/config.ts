import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

if (!process.env.JWT_PASSWORD || !process.env.MONGO_URL) {
  throw new Error(" Missing environment variables: JWT_PASSWORD or MONGO_URL");
}

export const JWT_PASSWORD = process.env.JWT_PASSWORD;
export const MONGO_URL = process.env.MONGO_URL;
