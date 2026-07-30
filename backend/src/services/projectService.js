<<<<<<< HEAD
import mongoose from "mongoose"
import Project from "../models/Project.js"
=======
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
>>>>>>> aca19ea (base de datos creada, empezando webservice conection)

const OBJECT_ID_RE = /^[a-fA-F0-9]{24}$/

function isValidObjectId(id) {
  return typeof id === "string" && OBJECT_ID_RE.test(id)
}

export async function list() {
  const rs = await turso.execute("SELECT * FROM projects ORDER BY created_at DESC")
  return rs.rows.map(formatProject)
}

export async function getById(id) {
<<<<<<< HEAD
  if (!isValidObjectId(id)) {
    const err = new Error("ID inválido")
    err.status = 400
    throw err
  }
  const project = await Project.findById(new mongoose.Types.ObjectId(id))
  if (!project) {
=======
  const rs = await turso.execute({ sql: "SELECT * FROM projects WHERE id = ?", args: [id] })
  if (rs.rows.length === 0) {
>>>>>>> aca19ea (base de datos creada, empezando webservice conection)
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

export async function remove(id) {
  const rs = await turso.execute({
    sql: "DELETE FROM projects WHERE id = ? RETURNING *",
    args: [id],
  })
  if (rs.rows.length === 0) {
    const err = new Error("Proyecto no encontrado")
    err.status = 404
    throw err
  }
  return formatProject(rs.rows[0])
}
