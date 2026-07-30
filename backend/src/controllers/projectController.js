import * as projectService from "../services/projectService.js"

export async function list(_req, res, next) {
  try {
    const projects = await projectService.list()
    res.json(projects)
  } catch (err) {
    next(err)
  }
}

export async function getById(req, res, next) {
  try {
    const project = await projectService.getById(req.params.id)
    res.json(project)
  } catch (err) {
    next(err)
  }
}

export async function create(req, res, next) {
  try {
    const project = await projectService.create(req.body)
    res.status(201).json(project)
  } catch (err) {
    next(err)
  }
}

export async function remove(req, res, next) {
  try {
    const project = await projectService.remove(req.params.id)
    res.json(project)
  } catch (err) {
    next(err)
  }
}
