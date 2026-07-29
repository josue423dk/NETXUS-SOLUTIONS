import { describe, it, expect } from "vitest"
import request from "supertest"
import app from "../app.js"
import { authHeader } from "./helpers.js"

describe("GET /api/projects", () => {
  it("devuelve lista vacía al inicio", async () => {
    const res = await request(app).get("/api/projects")
    expect(res.status).toBe(200)
    expect(res.body).toEqual([])
  })

  it("devuelve proyectos creados", async () => {
    const data = { nombre: "Test", descripción: "Desc" }
    await request(app).post("/api/projects").set(authHeader()).send(data)

    const res = await request(app).get("/api/projects")
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
    expect(res.body[0].nombre).toBe("Test")
  })
})

describe("GET /api/projects/:id", () => {
  it("devuelve 404 para ID inexistente", async () => {
    const res = await request(app).get("/api/projects/000000000000000000000000")
    expect(res.status).toBe(404)
    expect(res.body.error).toBe("Proyecto no encontrado")
  })

  it("devuelve 400 para ObjectId inválido", async () => {
    const res = await request(app).get("/api/projects/invalido")
    expect(res.status).toBe(400)
    expect(res.body.error).toBe("ID inválido")
  })

  it("devuelve el proyecto creado", async () => {
    const data = { nombre: "Encontrar", descripción: "Encontrar desc" }
    const created = await request(app)
      .post("/api/projects").set(authHeader()).send(data)

    const res = await request(app).get(`/api/projects/${created.body._id}`)
    expect(res.status).toBe(200)
    expect(res.body.nombre).toBe("Encontrar")
  })
})

describe("POST /api/projects", () => {
  it("crea proyecto con datos válidos", async () => {
    const data = {
      nombre: "Mi Proyecto",
      descripción: "Descripción del proyecto",
      tags: ["react", "node"],
      categoria: "desarrollo-web",
      destacado: true,
    }
    const res = await request(app)
      .post("/api/projects").set(authHeader()).send(data)

    expect(res.status).toBe(201)
    expect(res.body.nombre).toBe("Mi Proyecto")
    expect(res.body.destacado).toBe(true)
    expect(res.body._id).toBeDefined()
  })

  it("rechaza proyecto sin nombre", async () => {
    const res = await request(app)
      .post("/api/projects").set(authHeader())
      .send({ descripción: "desc" })
    expect(res.status).toBe(400)
  })

  it("rechaza proyecto sin descripción", async () => {
    const res = await request(app)
      .post("/api/projects").set(authHeader())
      .send({ nombre: "nom" })
    expect(res.status).toBe(400)
  })

  it("rechaza sin API key", async () => {
    const res = await request(app)
      .post("/api/projects")
      .send({ nombre: "nom", descripción: "desc" })
    expect(res.status).toBe(401)
  })

  it("rechaza API key incorrecta", async () => {
    const res = await request(app)
      .post("/api/projects")
      .set("X-API-Key", "wrong-key")
      .send({ nombre: "nom", descripción: "desc" })
    expect(res.status).toBe(401)
  })
})

describe("PUT /api/projects/:id", () => {
  it("actualiza proyecto existente", async () => {
    const created = await request(app)
      .post("/api/projects").set(authHeader())
      .send({ nombre: "Original", descripción: "Original desc" })

    const res = await request(app)
      .put(`/api/projects/${created.body._id}`).set(authHeader())
      .send({ nombre: "Actualizado", descripción: "Actualizado desc" })

    expect(res.status).toBe(200)
    expect(res.body.nombre).toBe("Actualizado")
  })

  it("devuelve 404 para ID inexistente", async () => {
    const res = await request(app)
      .put("/api/projects/000000000000000000000000").set(authHeader())
      .send({ nombre: "Nope", descripción: "Nope" })
    expect(res.status).toBe(404)
  })

  it("rechaza sin API key", async () => {
    const res = await request(app)
      .put("/api/projects/000000000000000000000000")
      .send({ nombre: "Nope", descripción: "Nope" })
    expect(res.status).toBe(401)
  })
})

describe("DELETE /api/projects/:id", () => {
  it("elimina proyecto existente", async () => {
    const created = await request(app)
      .post("/api/projects").set(authHeader())
      .send({ nombre: "Eliminar", descripción: "Eliminar desc" })

    const res = await request(app)
      .delete(`/api/projects/${created.body._id}`).set(authHeader())
    expect(res.status).toBe(204)
  })

  it("devuelve 404 para ID inexistente", async () => {
    const res = await request(app)
      .delete("/api/projects/000000000000000000000000").set(authHeader())
    expect(res.status).toBe(404)
  })

  it("rechaza sin API key", async () => {
    const res = await request(app)
      .delete("/api/projects/000000000000000000000000")
    expect(res.status).toBe(401)
  })
})
