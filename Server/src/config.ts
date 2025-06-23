import dotenv from "dotenv";
dotenv.config();

export const JWT_PASSWORD = process.env.JWT_PASSWORD;
if (!JWT_PASSWORD) {
  throw new Error("JWT_PASSWORD is not set in environment variables");
}