import { z } from "zod"

export function validate(schema) {
  return (req, _res, next) => {
    try {
      req.body = schema.parse(req.body)
      next()
    } catch (err) {
      if (err instanceof z.ZodError) {
        const messages = (err.issues || err.errors || []).map((e) => e.message).join(", ")
        const error = new Error(messages)
        error.status = 400
        next(error)
      } else {
        next(err)
      }
    }
  }
}

export const projectSchema = z.object({
  nombre: z.string().min(1, "nombre es requerido"),
  descripcion: z.string().min(1, "descripción es requerida"),
  imagen: z.string().url().optional().or(z.literal("")),
  tags: z.array(z.string()).optional(),
}).strip()

export const contactSchema = z.object({
  nombre: z.string().min(2, "nombre debe tener al menos 2 caracteres"),
  email: z.string().email("email inválido"),
  mensaje: z.string().min(10, "mensaje debe tener al menos 10 caracteres"),
}).strip()
