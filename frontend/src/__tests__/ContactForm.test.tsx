import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { ContactForm } from "@/components/ui/ContactForm"

const mockPost = vi.fn()

vi.mock("@/lib/api", () => ({
  api: {
    get: vi.fn(),
    post: (...args: unknown[]) => mockPost(...args),
  },
}))

beforeEach(() => {
  mockPost.mockReset()
})

async function fillForm() {
  const user = userEvent.setup()
  await user.type(screen.getByLabelText(/nombre/i), "Juan Pérez")
  await user.type(screen.getByLabelText(/email/i), "juan@test.com")
  await user.type(
    screen.getByLabelText(/mensaje/i),
    "Hola quiero un presupuesto para mi web",
  )
  return user
}

describe("ContactForm", () => {
  it("renderiza los campos del formulario", () => {
    render(<ContactForm />)
    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/mensaje/i)).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: /enviar mensaje/i }),
    ).toBeInTheDocument()
  })

  it("envía datos válidos y muestra éxito", async () => {
    mockPost.mockResolvedValue({ ok: true })
    render(<ContactForm />)

    const user = await fillForm()
    await user.click(screen.getByRole("button", { name: /enviar mensaje/i }))

    expect(mockPost).toHaveBeenCalledWith("/contact", {
      nombre: "Juan Pérez",
      email: "juan@test.com",
      mensaje: "Hola quiero un presupuesto para mi web",
    })

    expect(
      await screen.findByText(/mensaje enviado/i),
    ).toBeInTheDocument()
  })

  it("muestra errores de validación en campos vacíos", async () => {
    render(<ContactForm />)
    const user = userEvent.setup()
    await user.click(screen.getByRole("button", { name: /enviar mensaje/i }))

    expect(
      await screen.findByText(/el nombre debe tener al menos 2 caracteres/i),
    ).toBeInTheDocument()
    expect(mockPost).not.toHaveBeenCalled()
  })

  it("muestra error del servidor cuando falla el envío", async () => {
    mockPost.mockRejectedValue(new Error("Network error"))
    render(<ContactForm />)

    const user = await fillForm()
    await user.click(screen.getByRole("button", { name: /enviar mensaje/i }))

    expect(
      await screen.findByText(/no se pudo enviar el mensaje/i),
    ).toBeInTheDocument()
  })

  it("no envía si honeypot está lleno", async () => {
    const { container } = render(<ContactForm />)

    const honeypot = container.querySelector('input[name="website"]')!
    const user = userEvent.setup()
    await user.type(honeypot, "spam bot")
    await user.type(screen.getByLabelText(/nombre/i), "Juan")
    await user.type(screen.getByLabelText(/email/i), "juan@test.com")
    const msgInput = screen.getByLabelText(/mensaje/i)
    await user.type(msgInput, "Mensaje valido de prueba")

    await user.click(screen.getByRole("button", { name: /enviar mensaje/i }))
    expect(mockPost).not.toHaveBeenCalled()
  })
})
