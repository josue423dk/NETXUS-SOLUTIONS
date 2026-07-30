import { Router } from "express"
<<<<<<< HEAD
import rateLimit from "express-rate-limit"
import { z } from "zod"
import { validate } from "../middleware/validate.js"

const contactSchema = z.object({
  nombre: z.string().min(2, "Nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  mensaje: z.string().min(10, "Mensaje debe tener al menos 10 caracteres"),
}).strip()

const contactLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Demasiadas solicitudes de contacto, intentá de nuevo en un minuto" },
})

const router = Router()

router.post("/", contactLimiter, validate(contactSchema), (_req, res) => {
  res.json({ success: true })
})
=======
import * as controller from "../controllers/contactController.js"
import { validate, contactSchema } from "../middleware/validate.js"

const router = Router()

router.post("/", validate(contactSchema), controller.create)
>>>>>>> 7b27ac8 (feature: agregar endpoint, y valicon de proyectos)

export default router
