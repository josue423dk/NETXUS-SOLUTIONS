const API_BASE = "/api"

interface ApiError {
  error: string
}

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 10000)

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
      const body: ApiError = await res.json().catch(() => ({ error: res.statusText }))
      throw new Error(body.error || `Error ${res.status}`)
    }

    return res.json()
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
