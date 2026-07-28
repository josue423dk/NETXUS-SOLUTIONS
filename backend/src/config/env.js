import { config } from "dotenv"

config()

const required = ["PORT", "MONGODB_URI", "FRONTEND_URL"]

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Falta variable de entorno: ${key}`)
  }
}

export const env = {
  port: parseInt(process.env.PORT, 10) || 5000,
  mongoUri: process.env.MONGODB_URI,
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
}
