import { describe, it, expect } from "vitest"
import request from "supertest"
import app from "../app.js"
import { authHeader } from "./helpers.js"

describe("GET /api/contact", () => {
  it("devuelve lista vacía al inicio con auth", async () => {
    const res = await request(app).get("/api/contact").set(authHeader())
    expect(res.status).toBe(200)
    expect(res.body).toEqual([])
  })

  it("rechaza sin API key", async () => {
    const res = await request(app).get("/api/contact")
    expect(res.status).toBe(401)
  })
})

describe("POST /api/contact", () => {
  it("crea mensaje con datos válidos", async () => {
    const data = {
      nombre: "Juan Pérez",
      email: "juan@example.com",
      mensaje: "Hola, quiero un presupuesto para mi proyecto",
    }
    const res = await request(app).post("/api/contact").send(data)
    expect(res.status).toBe(201)
    expect(res.body.nombre).toBe("Juan Pérez")
    expect(res.body.leido).toBe(false)
    expect(res.body._id).toBeDefined()
  })

  it("devuelve mensajes creados en GET con auth", async () => {
    await request(app)
      .post("/api/contact")
      .send({ nombre: "Ana", email: "ana@test.com", mensaje: "Mensaje de prueba con diez chars" })

    const res = await request(app).get("/api/contact").set(authHeader())
    expect(res.status).toBe(200)
    expect(res.body.length).toBeGreaterThanOrEqual(1)
    expect(res.body.some((c) => c.nombre === "Ana")).toBe(true)
  })

  it("rechaza sin nombre", async () => {
    const res = await request(app)
      .post("/api/contact")
      .send({ email: "a@b.com", mensaje: "Mensaje de prueba con diez chars" })
    expect(res.status).toBe(400)
  })

  it("rechaza email inválido", async () => {
    const res = await request(app)
      .post("/api/contact")
      .send({ nombre: "Test", email: "no-email", mensaje: "Mensaje de prueba con diez chars" })
    expect(res.status).toBe(400)
  })

  it("rechaza mensaje muy corto", async () => {
    const res = await request(app)
      .post("/api/contact")
      .send({ nombre: "Test", email: "a@b.com", mensaje: "Corto" })
    expect(res.status).toBe(400)
  })
})
