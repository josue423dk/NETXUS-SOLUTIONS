import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { BrowserRouter } from "react-router-dom"
import { ButtonPrimary } from "@/components/ui/ButtonPrimary"

function renderWithRouter(ui: React.ReactElement) {
  return render(<BrowserRouter>{ui}</BrowserRouter>)
}

describe("ButtonPrimary", () => {
  it("renderiza como button por defecto", () => {
    renderWithRouter(<ButtonPrimary>Click</ButtonPrimary>)
    const btn = screen.getByRole("button", { name: /click/i })
    expect(btn.tagName).toBe("BUTTON")
  })

  it("renderiza como link externo cuando href empieza con http", () => {
    renderWithRouter(
      <ButtonPrimary href="https://example.com">Ir</ButtonPrimary>,
    )
    const link = screen.getByRole("link", { name: /ir/i })
    expect(link).toHaveAttribute("href", "https://example.com")
    expect(link).toHaveAttribute("target", "_blank")
    expect(link).toHaveAttribute("rel", "noopener noreferrer")
  })

  it("renderiza como Link interno cuando href no es http", () => {
    renderWithRouter(
      <ButtonPrimary href="/cotizacion">Cotizar</ButtonPrimary>,
    )
    const link = screen.getByRole("link", { name: /cotizar/i })
    expect(link).toHaveAttribute("href", "/cotizacion")
  })

  it("no ejecuta onClick cuando está disabled", async () => {
    const onClick = vi.fn()
    renderWithRouter(
      <ButtonPrimary disabled onClick={onClick}>
        Click
      </ButtonPrimary>,
    )
    const btn = screen.getByRole("button")
    expect(btn).toBeDisabled()
    await userEvent.click(btn)
    expect(onClick).not.toHaveBeenCalled()
  })

  it("aplica aria-label cuando se pasa", () => {
    renderWithRouter(
      <ButtonPrimary ariaLabel="Enviar formulario">
        Enviar
      </ButtonPrimary>,
    )
    expect(screen.getByLabelText("Enviar formulario")).toBeInTheDocument()
  })

  it("renderiza con variante outline", () => {
    renderWithRouter(
      <ButtonPrimary variant="outline">Outline</ButtonPrimary>,
    )
    const btn = screen.getByRole("button")
    expect(btn.className).toContain("border-neutral-300")
  })
})
