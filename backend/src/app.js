import express from "express"
import cors from "cors"
import helmet from "helmet"
import rateLimit from "express-rate-limit"
import { env } from "./config/env.js"
import projectRoutes from "./routes/projectRoutes.js"
import contactRoutes from "./routes/contactRoutes.js"
import { errorHandler } from "./middleware/errorHandler.js"

const app = express()

app.use(helmet())
app.use(cors({ origin: env.frontendUrl }))
app.use(express.json({ limit: "100kb" }))

const isTest = process.env.VITEST === "true"

if (!isTest) {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Demasiadas solicitudes, intentá de nuevo más tarde" },
  })
  app.use("/api/", limiter)

  const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Demasiados intentos de contacto. Esperá 15 minutos." },
  })
  app.use("/api/contact", contactLimiter)
}

app.get("/", (_req, res) => {
  res.json({ message: "MONRU UX API" })
})

app.use("/api/projects", projectRoutes)
app.use("/api/contact", contactRoutes)

app.use(errorHandler)

export default app
