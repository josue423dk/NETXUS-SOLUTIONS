import Project from "../models/Project.js"

export async function list() {
  return Project.find({}).sort({ createdAt: -1 })
}

export async function getById(id) {
  const project = await Project.findById(id)
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
