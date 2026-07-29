import mongoose from "mongoose"

const projectSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    descripción: { type: String, required: true },
    imagen: { type: String },
    imagenDark: { type: String },
    tags: [{ type: String }],
    url: { type: String },
    categoria: {
      type: String,
      enum: ["desarrollo-web", "apps-moviles", "sistemas-a-medida", "consultoria"],
    },
    destacado: { type: Boolean, default: false },
  },
  { timestamps: true }
)

projectSchema.index({ createdAt: -1 })

export default mongoose.model("Project", projectSchema)
