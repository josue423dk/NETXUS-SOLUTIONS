import mongoose from "mongoose"
import Project from "../models/Project.js"

const OBJECT_ID_RE = /^[a-fA-F0-9]{24}$/

function isValidObjectId(id) {
  return typeof id === "string" && OBJECT_ID_RE.test(id)
}

export async function list() {
  return Project.find({}).sort({ createdAt: -1 })
}

export async function getById(id) {
  if (!isValidObjectId(id)) {
    const err = new Error("ID inválido")
    err.status = 400
    throw err
  }
  const project = await Project.findById(new mongoose.Types.ObjectId(id))
  if (!project) {
    const err = new Error("Proyecto no encontrado")
    err.status = 404
    throw err
  }
  return project
}

export async function create(data) {
  const project = new Project(data)
  return project.save()
}
