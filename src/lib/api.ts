const API_BASE = "https://monru-ux-back.onrender.com/api"

const USER_FRIENDLY_MESSAGES: Record<number, string> = {
  400: "Datos inválidos. Verificá los campos e intentá de nuevo.",
  404: "El recurso solicitado no existe.",
  429: "Demasiadas solicitudes. Esperá un momento antes de intentar de nuevo.",
  500: "Error interno del servidor. Si el problema persiste, contactanos.",
}

const TIMEOUT_MS = 10000

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers as Record<string, string> | undefined),
      },
      signal: controller.signal,
    })

    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      const message = body.error || USER_FRIENDLY_MESSAGES[res.status] || `Error inesperado (${res.status})`
      throw new Error(message)
    }

    return res.json()
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      throw new Error("La solicitud tardó demasiado. Verificá tu conexión e intentá de nuevo.")
    }
    throw err
  } finally {
    clearTimeout(timeoutId)
  }
}

export const api = {
  get<T>(endpoint: string, options?: RequestInit) {
    return request<T>(endpoint, { method: "GET", ...options })
  },
  post<T>(endpoint: string, data: unknown, options?: RequestInit) {
    return request<T>(endpoint, { method: "POST", body: JSON.stringify(data), ...options })
  },
  delete<T>(endpoint: string, options?: RequestInit) {
    return request<T>(endpoint, { method: "DELETE", ...options })
  },
}
