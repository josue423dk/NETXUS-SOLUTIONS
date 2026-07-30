import { turso } from "../config/turso.js"
import crypto from "crypto"

export async function create(data) {
  const id = crypto.randomUUID()
  const { nombre, email, mensaje } = data

  await turso.execute({
    sql: `INSERT INTO contacts (id, nombre, email, mensaje) VALUES (?, ?, ?, ?)`,
    args: [id, nombre, email, mensaje],
  })

  return { id, nombre, email, mensaje }
}
