import { createClient } from "@libsql/client"
import { env } from "./env.js"

export const turso = createClient({
  url: env.tursoDbUrl,
  authToken: env.tursoAuthToken,
})
