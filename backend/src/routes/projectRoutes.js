import { Router } from "express"
import { Project } from "../models/Project"

const router = Router()

// Obtener todos los proyectos
router.get("/", async (_req, res) => {
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 })
    res.json(projects)
  } catch (error) {
    res.status(500).json({ error: "Error al obtener proyectos" })
  }
})

// Obtener un proyecto por ID
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
    if (!project) {
      return res.status(404).json({ error: "Proyecto no encontrado" })
    }
    res.json(project)
  } catch (error) {
    res.status(500).json({ error: "Error al obtener proyecto" })
  }
})

// Crear un nuevo proyecto
router.post("/", async (req, res) => {
  try {
    const { nombre, descripción, imagen, tags } = req.body

    if (!nombre || !descripción) {
      return res.status(400).json({ error: "nombre y descripción son requeridos" })
    }

    const project = new Project({
      nombre,
      descripción,
      imagen,
      tags,
    })

    await project.save()
    res.status(201).json(project)
  } catch (error) {
    res.status(500).json({ error: "Error al crear proyecto" })
  }
})

export default router