import { config } from "dotenv";

config();

export const PORT = process.env.PORT || 3002;
export const FRONTEND_URL =
  process.env.FRONTEND_URL || `http://localhost:${PORT}`;
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_USER = process.env.DB_USER || "root";
export const DB_PASSWORD = process.env.DB_PASSWORD || "threads-password";
export const DB_DATABASE = process.env.DB_DATABASE || "threads-db";
export const DB_PORT = process.env.DB_PORT || 3306;
export const JWT_SECRET = process.env.JWT_SECRET;
