import { describe, it, expect, vi, beforeEach } from "vitest"
import { api } from "@/lib/api"

beforeEach(() => {
  vi.restoreAllMocks()
})

describe("api.get", () => {
  it("hace fetch con GET y endpoint correcto", async () => {
    const mock = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ data: "ok" }),
    })
    vi.stubGlobal("fetch", mock)

    const result = await api.get("/projects")
    expect(mock).toHaveBeenCalledWith(
      "http://localhost:5000/api/projects",
      expect.objectContaining({
        method: undefined,
        headers: { "Content-Type": "application/json" },
      }),
    )
    expect(result).toEqual({ data: "ok" })
  })
})

describe("api.post", () => {
  it("hace fetch con POST y body JSON", async () => {
    const mock = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ id: 1 }),
    })
    vi.stubGlobal("fetch", mock)

    const result = await api.post("/contact", { name: "test" })
    expect(mock).toHaveBeenCalledWith(
      "http://localhost:5000/api/contact",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ name: "test" }),
      }),
    )
    expect(result).toEqual({ id: 1 })
  })
})

describe("api error handling", () => {
  it("lanza error en 429", async () => {
    const mock = vi.fn().mockResolvedValue({
      ok: false,
      status: 429,
      json: () => Promise.resolve({ error: "" }),
    })
    vi.stubGlobal("fetch", mock)

    await expect(api.get("/projects")).rejects.toThrow(
      "Demasiadas solicitudes",
    )
  })

  it("lanza error con mensaje del servidor", async () => {
    const mock = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      json: () => Promise.resolve({ error: "Bad request" }),
    })
    vi.stubGlobal("fetch", mock)

    await expect(api.post("/contact", {})).rejects.toThrow("Bad request")
  })

  it("lanza error cuando falla conexión", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("Network error")),
    )
    await expect(api.get("/projects")).rejects.toThrow("Network error")
  })
})
