import jwt from "jsonwebtoken"
import { env } from "../config/env.js"

export function login(apiKey) {
  if (apiKey !== env.adminApiKey) {
    const err = new Error("API Key inválida")
    err.status = 401
    throw err
  }
  const token = jwt.sign({ role: "admin" }, env.jwtSecret, { expiresIn: "7d" })
  return { token }
}
