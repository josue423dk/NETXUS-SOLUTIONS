import { env } from "../config/env.js"

export function requireAdmin(req, _res, next) {
  const key = req.headers["x-api-key"]
  if (!key || key !== env.adminApiKey) {
    const err = new Error("No autorizado")
    err.status = 401
    return next(err)
  }
  next()
}
