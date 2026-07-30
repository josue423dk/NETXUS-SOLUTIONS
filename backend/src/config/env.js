import { config } from "dotenv"

config()

const required = ["PORT", "TURSO_DB_URL", "TURSO_AUTH_TOKEN", "FRONTEND_URL"]

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Falta variable de entorno: ${key}`)
  }
}

export const env = {
  port: parseInt(process.env.PORT, 10) || 5000,
  tursoDbUrl: process.env.TURSO_DB_URL,
  tursoAuthToken: process.env.TURSO_AUTH_TOKEN,
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
}
