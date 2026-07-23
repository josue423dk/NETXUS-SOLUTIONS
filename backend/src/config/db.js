import mongoose from "mongoose"

export async function connectDB() {
  const uri = process.env.MONGODB_URI

  if (!uri) {
    throw new Error("MONGODB_URI no está definida en las variables de entorno")
  }

  try {
    await mongoose.connect(uri)
    console.log("Conectado a MongoDB")
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error.message)
    process.exit(1)
  }
}
