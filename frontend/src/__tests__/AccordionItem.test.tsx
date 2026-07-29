import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { AccordionItem } from "@/components/ui/AccordionItem"

describe("AccordionItem", () => {
  const defaultProps = {
    pregunta: "¿Cómo empezar?",
    respuesta: "Comunicate con nosotros.",
    index: 0,
    abierto: false,
    onToggle: vi.fn(),
  }

  it("renderiza la pregunta", () => {
    render(<AccordionItem {...defaultProps} />)
    expect(screen.getByText("¿Cómo empezar?")).toBeInTheDocument()
  })

  it("llama onToggle al hacer click", async () => {
    const onToggle = vi.fn()
    render(<AccordionItem {...defaultProps} onToggle={onToggle} />)
    await userEvent.click(screen.getByRole("button"))
    expect(onToggle).toHaveBeenCalledOnce()
  })

  it("aria-expanded es false cuando abierto=false", () => {
    render(<AccordionItem {...defaultProps} abierto={false} />)
    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-expanded",
      "false",
    )
  })

  it("aria-expanded es true cuando abierto=true", () => {
    render(<AccordionItem {...defaultProps} abierto={true} />)
    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-expanded",
      "true",
    )
  })

  it("tiene aria-controls que apunta al panel", () => {
    render(<AccordionItem {...defaultProps} />)
    const btn = screen.getByRole("button")
    const controls = btn.getAttribute("aria-controls")
    expect(controls).toBe("faq-answer-0")
    expect(document.getElementById(controls!)).toBeInTheDocument()
  })
})
