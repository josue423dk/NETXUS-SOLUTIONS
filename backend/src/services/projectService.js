import { turso } from "../config/turso.js"
import crypto from "crypto"

function formatProject(r) {
  return {
    id: r.id,
    nombre: r.nombre,
    descripcion: r.descripcion,
    imagen: r.imagen,
    tags: JSON.parse(r.tags || "[]"),
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  }
}

export async function list() {
  const rs = await turso.execute("SELECT * FROM projects ORDER BY created_at DESC")
  return rs.rows.map(formatProject)
}

export async function getById(id) {
  const rs = await turso.execute({ sql: "SELECT * FROM projects WHERE id = ?", args: [id] })
  if (rs.rows.length === 0) {
    const err = new Error("Proyecto no encontrado")
    err.status = 404
    throw err
  }
  return formatProject(rs.rows[0])
}

export async function create(data) {
  const id = crypto.randomUUID()
  const { nombre, descripcion, imagen, tags } = data
  const rs = await turso.execute({
    sql: "INSERT INTO projects (id, nombre, descripcion, imagen, tags) VALUES (?, ?, ?, ?, ?) RETURNING *",
    args: [id, nombre, descripcion, imagen || null, JSON.stringify(tags || [])],
  })
  return formatProject(rs.rows[0])
}
