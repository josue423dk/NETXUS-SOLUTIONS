import { z } from "zod"

export function validate(schema) {
  return (req, _res, next) => {
    try {
      req.body = schema.parse(req.body)
      next()
    } catch (err) {
      if (err instanceof z.ZodError) {
        const error = new Error(err.errors.map((e) => e.message).join(", "))
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
  descripción: z.string().min(1, "descripción es requerida"),
  imagen: z.string().url().optional().or(z.literal("")),
  tags: z.array(z.string()).optional(),
}).strip()
