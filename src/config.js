import { config } from "dotenv";

config();

export const PORT = process.env.PORT || 3002;
export const FRONTEND_URL =
  process.env.FRONTEND_URL || `http://localhost:${PORT}`;
