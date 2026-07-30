const GENERIC_ERROR = "Error interno del servidor"

const SAFE_MESSAGES = {
  ValidationError: "Datos inválidos",
  CastError: "ID inválido",
}

export function errorHandler(err, _req, res, _next) {
  if (err.name === "ValidationError" || err.name === "CastError") {
    return res.status(400).json({ error: SAFE_MESSAGES[err.name] })
  }

  const status = err.status && err.status >= 400 && err.status < 600 ? err.status : 500
  res.status(status).json({
    error: status < 500 ? err.message : GENERIC_ERROR,
  })
}
