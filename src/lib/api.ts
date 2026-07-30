const API_BASE = "/api"

interface ApiError {
  error: string
}

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 10000)

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      ...options,
    })

    if (!res.ok) {
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
