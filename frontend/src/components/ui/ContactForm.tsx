import { useState } from "react"
import { z } from "zod"

const contactSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  mensaje: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
})

type ContactData = z.infer<typeof contactSchema>

type FormStatus = "idle" | "loading" | "success" | "error"

export function ContactForm() {
  const [form, setForm] = useState<ContactData>({
    nombre: "",
    email: "",
    mensaje: "",
  })
  const [errors, setErrors] = useState<Partial<Record<keyof ContactData, string>>>({})
  const [status, setStatus] = useState<FormStatus>("idle")
  const [serverError, setServerError] = useState("")

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof ContactData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setServerError("")

    const result = contactSchema.safeParse(form)
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactData, string>> = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof ContactData
        if (field) fieldErrors[field] = issue.message
      }
      setErrors(fieldErrors)
      setStatus("idle")
      return
    }

    setErrors({})

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/contact`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(result.data),
        }
      )

      if (!res.ok) throw new Error("Error al enviar el mensaje")

      setStatus("success")
      setForm({ nombre: "", email: "", mensaje: "" })
    } catch {
      setServerError("No se pudo enviar el mensaje. Intentalo de nuevo.")
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <h3 className="text-xl font-heading font-semibold text-primary-900 mb-2">
          Mensaje enviado
        </h3>
        <p className="text-neutral-700">
          Gracias por contactarnos. Te responderemos a la brevedad.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <label htmlFor="nombre" className="block text-sm font-medium text-neutral-700 mb-1">
          Nombre
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          value={form.nombre}
          onChange={handleChange}
          aria-invalid={!!errors.nombre}
          aria-describedby={errors.nombre ? "nombre-error" : undefined}
          className={`w-full px-4 py-3 rounded-lg border text-sm bg-neutral-50 dark:bg-neutral-100 text-neutral-900 dark:text-neutral-900 placeholder-neutral-500 transition-all focus:outline-none focus:ring-2 ${
            errors.nombre
              ? "border-error focus:ring-error/30"
              : "border-neutral-300 focus:ring-primary-700/30 focus:border-primary-700"
          }`}
          placeholder="Tu nombre"
        />
        {errors.nombre && (
          <p id="nombre-error" className="mt-1 text-xs text-error">{errors.nombre}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={`w-full px-4 py-3 rounded-lg border text-sm bg-neutral-50 dark:bg-neutral-100 text-neutral-900 dark:text-neutral-900 placeholder-neutral-500 transition-all focus:outline-none focus:ring-2 ${
            errors.email
              ? "border-error focus:ring-error/30"
              : "border-neutral-300 focus:ring-primary-700/30 focus:border-primary-700"
          }`}
          placeholder="tu@email.com"
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-xs text-error">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="mensaje" className="block text-sm font-medium text-neutral-700 mb-1">
          Mensaje
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={4}
          value={form.mensaje}
          onChange={handleChange}
          aria-invalid={!!errors.mensaje}
          aria-describedby={errors.mensaje ? "mensaje-error" : undefined}
          className={`w-full px-4 py-3 rounded-lg border text-sm bg-neutral-50 dark:bg-neutral-100 text-neutral-900 dark:text-neutral-900 placeholder-neutral-500 transition-all focus:outline-none focus:ring-2 resize-y ${
            errors.mensaje
              ? "border-error focus:ring-error/30"
              : "border-neutral-300 focus:ring-primary-700/30 focus:border-primary-700"
          }`}
          placeholder="Contanos sobre tu proyecto..."
        />
        {errors.mensaje && (
          <p id="mensaje-error" className="mt-1 text-xs text-error">{errors.mensaje}</p>
        )}
      </div>

      {status === "error" && serverError && (
        <div className="p-3 rounded-lg bg-error/10 border border-error/20">
          <p className="text-sm text-error">{serverError}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-3 px-6 rounded-lg bg-primary-700 text-white font-semibold text-sm hover:bg-primary-500 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-700/50 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
      >
        {status === "loading" ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Enviando...
          </>
        ) : (
          "Enviar mensaje"
        )}
      </button>
    </form>
  )
}