import express from "express"
import cors from "cors"
import { config } from "dotenv"
import { connectDB } from "./config/db.js"
import projectRoutes from "./routes/projectRoutes.js"

config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173" }))
app.use(express.json())

connectDB()

app.get("/", (_req, res) => {
  res.json({ message: "Netxus Solutions API" })
})

app.use("/api/projects", projectRoutes)

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
