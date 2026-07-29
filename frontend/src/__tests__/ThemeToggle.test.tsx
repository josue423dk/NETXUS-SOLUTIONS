import { describe, it, expect, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { ThemeToggle } from "@/components/ui/ThemeToggle"

beforeEach(() => {
  localStorage.clear()
  document.documentElement.removeAttribute("data-theme")
})

describe("ThemeToggle", () => {
  it("renderiza con role switch", () => {
    render(<ThemeToggle />)
    expect(screen.getByRole("switch")).toBeInTheDocument()
  })

  it("alterna estado al hacer click", async () => {
    render(<ThemeToggle />)
    const toggle = screen.getByRole("switch")

    const initial = toggle.getAttribute("aria-checked")
    await userEvent.click(toggle)
    expect(toggle.getAttribute("aria-checked")).toBe(
      initial === "true" ? "false" : "true",
    )
  })

  it("persiste en localStorage", async () => {
    render(<ThemeToggle />)
    const toggle = screen.getByRole("switch")

    await userEvent.click(toggle)
    const stored = localStorage.getItem("theme")
    expect(stored).toBe(toggle.getAttribute("aria-checked") === "true" ? "dark" : "light")
  })

  it("actualiza data-theme en html", async () => {
    render(<ThemeToggle />)
    const toggle = screen.getByRole("switch")

    await userEvent.click(toggle)
    const theme = document.documentElement.getAttribute("data-theme")
    expect(theme).toBe(
      toggle.getAttribute("aria-checked") === "true" ? "dark" : "light",
    )
  })
})
