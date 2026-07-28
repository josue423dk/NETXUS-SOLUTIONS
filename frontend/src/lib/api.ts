const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

interface ApiError {
  error: string
}

async function request<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  })

  if (!res.ok) {
    const body: ApiError = await res.json().catch(() => ({ error: res.statusText }))
    throw new Error(body.error || `Error ${res.status}`)
  }

  return res.json()
}

export const api = {
  get<T>(endpoint: string) {
    return request<T>(endpoint)
  },
  post<T>(endpoint: string, data: unknown) {
    return request<T>(endpoint, { method: "POST", body: JSON.stringify(data) })
  },
}
