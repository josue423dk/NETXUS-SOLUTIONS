import { useState, useEffect } from "react"
import { api } from "../lib/api"
import type { Project } from "../types"

type Status = "idle" | "loading" | "error" | "success"

export function Admin() {
  const [apiKey, setApiKey] = useState("")
  const [token, setToken] = useState(localStorage.getItem("admin_token") || "")
  const [status, setStatus] = useState<Status>(token ? "success" : "idle")
  const [error, setError] = useState("")

  const [nombre, setNombre] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [imagen, setImagen] = useState("")
  const [tags, setTags] = useState("")
  const [projectStatus, setProjectStatus] = useState<Status>("idle")

  const [projects, setProjects] = useState<Project[]>([])
  const [projectsLoading, setProjectsLoading] = useState(false)
  const [deleteStatus, setDeleteStatus] = useState<Record<string, Status>>({})

  async function fetchProjects() {
    setProjectsLoading(true)
    try {
      const data = await api.get<Project[]>("/projects", {
        headers: { Authorization: `Bearer ${token}` } as Record<string, string>,
      })
      setProjects(data)
    } catch {
      setError("Error al cargar proyectos")
    } finally {
      setProjectsLoading(false)
    }
  }

  useEffect(() => {
    if (token) fetchProjects()
  }, [token])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setStatus("loading")
    setError("")
    try {
      const res = await api.post<{ token: string }>("/auth/login", { apiKey })
      localStorage.setItem("admin_token", res.token)
      setToken(res.token)
      setStatus("success")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al iniciar sesión")
      setStatus("error")
    }
  }

  function handleLogout() {
    localStorage.removeItem("admin_token")
    setToken("")
    setStatus("idle")
    setProjects([])
  }

  async function handleCreateProject(e: React.FormEvent) {
    e.preventDefault()
    setProjectStatus("loading")
    try {
      await api.post(
        "/projects",
        {
          nombre,
          descripcion,
          imagen: imagen || undefined,
          tags: tags ? tags.split(",").map((t) => t.trim()) : [],
        },
        { headers: { Authorization: `Bearer ${token}` } as Record<string, string> }
      )
      setProjectStatus("success")
      setNombre("")
      setDescripcion("")
      setImagen("")
      setTags("")
      fetchProjects()
      setTimeout(() => setProjectStatus("idle"), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al crear proyecto")
      setProjectStatus("error")
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar este proyecto?")) return
    setDeleteStatus((prev) => ({ ...prev, [id]: "loading" }))
    try {
      await api.delete(`/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` } as Record<string, string>,
      })
      setProjects((prev) => prev.filter((p) => p.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al eliminar")
    } finally {
      setDeleteStatus((prev) => ({ ...prev, [id]: "idle" }))
    }
  }

  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] px-4">
        <div className="w-full max-w-md p-8 bg-neutral-50 dark:bg-neutral-100 rounded-2xl shadow-lg">
          <h1 className="text-2xl font-heading font-bold text-primary-900 dark:text-neutral-900 mb-6 text-center">
            Admin — Login
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-700 mb-1">
                API Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-50 text-neutral-900 dark:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-700/50"
                placeholder="Ingresá la API Key"
                required
              />
            </div>
            {error && <p className="text-sm text-error">{error}</p>}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-2.5 bg-primary-700 text-white font-semibold rounded-lg hover:bg-primary-500 transition-colors disabled:opacity-50"
            >
              {status === "loading" ? "Ingresando..." : "Ingresar"}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-heading font-bold text-primary-900 dark:text-neutral-900">
          Admin — Proyectos
        </h1>
        <button
          onClick={handleLogout}
          className="text-sm text-neutral-500 hover:text-primary-700 transition-colors"
        >
          Cerrar sesión
        </button>
      </div>

      {error && (
        <p className="text-sm text-error mb-4 bg-error/10 px-4 py-2 rounded-lg">{error}</p>
      )}

      <form onSubmit={handleCreateProject} className="space-y-4 bg-neutral-50 dark:bg-neutral-100 p-6 rounded-2xl shadow-md mb-10">
        <h2 className="text-lg font-heading font-semibold text-primary-900 dark:text-neutral-900">
          Crear proyecto
        </h2>
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-700 mb-1">Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-50 text-neutral-900 dark:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-700/50"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-700 mb-1">Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-50 text-neutral-900 dark:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-700/50 resize-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-700 mb-1">URL de imagen</label>
          <input
            type="url"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
            className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-50 text-neutral-900 dark:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-700/50"
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-700 mb-1">Tags (separados por coma)</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-50 text-neutral-900 dark:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-700/50"
            placeholder="react, node, tailwind"
          />
        </div>

        {projectStatus === "success" && (
          <p className="text-sm text-success">Proyecto creado correctamente</p>
        )}

        <button
          type="submit"
          disabled={projectStatus === "loading"}
          className="w-full py-2.5 bg-primary-700 text-white font-semibold rounded-lg hover:bg-primary-500 transition-colors disabled:opacity-50"
        >
          {projectStatus === "loading" ? "Creando..." : "Crear proyecto"}
        </button>
      </form>

      <section>
        <h2 className="text-lg font-heading font-semibold text-primary-900 dark:text-neutral-900 mb-4">
          Proyectos existentes
        </h2>

        {projectsLoading ? (
          <p className="text-sm text-neutral-500">Cargando proyectos...</p>
        ) : projects.length === 0 ? (
          <p className="text-sm text-neutral-500">No hay proyectos creados desde el panel.</p>
        ) : (
          <ul className="space-y-3">
            {projects.map((p) => (
              <li
                key={p.id}
                className="flex items-center justify-between bg-neutral-50 dark:bg-neutral-100 p-4 rounded-xl shadow-sm"
              >
                <div className="min-w-0 flex-1 mr-4">
                  <p className="font-heading font-semibold text-primary-900 dark:text-neutral-900 truncate">
                    {p.nombre}
                  </p>
                  <p className="text-xs text-neutral-500 truncate mt-0.5">{p.descripcion}</p>
                </div>
                <button
                  onClick={() => handleDelete(p.id!)}
                  disabled={deleteStatus[p.id!] === "loading"}
                  className="flex-shrink-0 px-3 py-1.5 text-xs font-semibold text-error border border-error/30 rounded-lg hover:bg-error/10 transition-colors disabled:opacity-50"
                >
                  {deleteStatus[p.id!] === "loading" ? "Eliminando..." : "Eliminar"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
