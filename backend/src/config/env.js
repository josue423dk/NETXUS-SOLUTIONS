import { config } from "dotenv"

config()

const required = ["PORT", "MONGODB_URI", "FRONTEND_URL", "ADMIN_API_KEY"]
const isTest = process.env.VITEST === "true"

if (!isTest) {
  for (const key of required) {
    if (!process.env[key]) {
      throw new Error(`Falta variable de entorno: ${key}`)
    }
  }

  const rawPort = parseInt(process.env.PORT, 10)
  if (isNaN(rawPort)) {
    throw new Error("PORT debe ser un número válido")
  }
}

export const env = {
  port: parseInt(process.env.PORT, 10) || 5000,
  mongoUri: process.env.MONGODB_URI || "mongodb://localhost:27017/netxus",
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
  adminApiKey: process.env.ADMIN_API_KEY || "",
}
