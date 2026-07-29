const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

interface ApiError {
  error: string
}

async function request<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 10000)

  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  }
  const mergedHeaders = { ...defaultHeaders, ...(options?.headers as Record<string, string> || {}) }
  const signal = options?.signal ?? controller.signal

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: options?.method,
      body: options?.body,
      headers: mergedHeaders,
      signal,
    })

    if (!res.ok) {
      if (res.status === 429) {
        throw new Error("Demasiadas solicitudes. Por favor, intente de nuevo más tarde.")
      }
      const body: ApiError = await res.json().catch(() => ({ error: res.statusText }))
      throw new Error(body.error || `Error ${res.status}`)
    }

    return res.json()
  } finally {
    clearTimeout(timeoutId)
  }
}

export const api = {
  get<T>(endpoint: string) {
    return request<T>(endpoint)
  },
  post<T>(endpoint: string, data: unknown) {
    return request<T>(endpoint, { method: "POST", body: JSON.stringify(data) })
  },
}
