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

export async function update(id, data) {
  const project = await Project.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  })
  if (!project) {
    const err = new Error("Proyecto no encontrado")
    err.status = 404
    throw err
  }
  return project
}

export async function remove(id) {
  const project = await Project.findByIdAndDelete(id)
  if (!project) {
    const err = new Error("Proyecto no encontrado")
    err.status = 404
    throw err
  }
  return project
}
