import * as authService from "../services/authService.js"

export async function login(req, res, next) {
  try {
    const { apiKey } = req.body
    if (!apiKey) {
      return res.status(400).json({ error: "apiKey es requerida" })
    }
    const result = authService.login(apiKey)
    res.json(result)
  } catch (err) {
    next(err)
  }
}
