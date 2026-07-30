import express from "express"
import cors from "cors"
import helmet from "helmet"
import rateLimit from "express-rate-limit"
import { env } from "./config/env.js"
import { initSchema } from "./config/schema.js"
import projectRoutes from "./routes/projectRoutes.js"
import contactRoutes from "./routes/contactRoutes.js"
import { errorHandler } from "./middleware/errorHandler.js"

const app = express()

initSchema()

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'strict-dynamic'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      fontSrc: ["'self'", "https://api.fontshare.com"],
      connectSrc: ["'self'", "https:"],
      frameAncestors: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"],
      objectSrc: ["'none'"],
      frameSrc: ["'none'"],
    },
  },
  crossOriginOpenerPolicy: { policy: "same-origin" },
  crossOriginEmbedderPolicy: { policy: "require-corp" },
}))
app.use(cors({ origin: env.frontendUrl }))
app.use(express.json({ limit: "100kb" }))

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Demasiadas solicitudes, intentá de nuevo más tarde" },
})
app.use("/api/", limiter)

app.get("/", (_req, res) => {
  res.json({ message: "MONRU UX API" })
})

app.use("/api/projects", projectRoutes)
app.use("/api/contact", contactRoutes)

app.use(errorHandler)

app.listen(env.port, () => {
  console.log(`Servidor corriendo en http://localhost:${env.port}`)
})
