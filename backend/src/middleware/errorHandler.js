export function errorHandler(err, _req, res, _next) {
  console.error("[ERROR]", err.message)

  if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message })
  }

  if (err.name === "CastError") {
    return res.status(400).json({ error: "ID inválido" })
  }

  res.status(err.status || 500).json({
    error: err.message || "Error interno del servidor",
  })
}
