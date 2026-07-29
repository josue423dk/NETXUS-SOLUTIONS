import { connectDB } from "./config/db.js"
import app from "./app.js"
import { env } from "./config/env.js"

connectDB()

app.listen(env.port, () => {
  console.log(`Servidor corriendo en http://localhost:${env.port}`)
})
