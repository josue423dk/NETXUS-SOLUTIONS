import { z } from "zod"

export function validate(schema) {
  return (req, _res, next) => {
    try {
      req.body = schema.parse(req.body)
      next()
    } catch (err) {
      if (err instanceof z.ZodError) {
        const error = new Error(err.issues.map((e) => e.message).join(", "))
        error.status = 400
        next(error)
      } else {
        next(err)
      }
    }
  }
}

export const projectSchema = z.object({
  nombre: z.string().min(1, "nombre es requerido").max(120, "nombre muy largo"),
  descripción: z.string().min(1, "descripción es requerida").max(2000, "descripción muy larga"),
  imagen: z.string().url().optional().or(z.literal("")),
  imagenDark: z.string().url().optional().or(z.literal("")),
  tags: z.array(z.string().max(50)).optional(),
  url: z.string().url().optional().or(z.literal("")),
  categoria: z
    .enum(["desarrollo-web", "apps-moviles", "sistemas-a-medida", "consultoria"])
    .optional(),
  destacado: z.boolean().optional(),
}).strip()

export const contactSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres").max(100, "nombre muy largo"),
  email: z.string().email("Email inválido").max(254, "email muy largo"),
  mensaje: z.string().min(10, "El mensaje debe tener al menos 10 caracteres").max(5000, "mensaje muy largo"),
}).strip()
