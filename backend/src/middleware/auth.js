import jwt from "jsonwebtoken"
import { env } from "../config/env.js"

export function auth(req, res, next) {
  const header = req.headers.authorization
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token requerido" })
  }
  try {
    const decoded = jwt.verify(header.split(" ")[1], env.jwtSecret)
    req.user = decoded
    next()
  } catch {
    res.status(401).json({ error: "Token inválido o expirado" })
  }
}
