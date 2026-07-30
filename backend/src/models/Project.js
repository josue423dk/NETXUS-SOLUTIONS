import mongoose from "mongoose"

const projectSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    descripción: { type: String, required: true },
    imagen: { type: String },
    tags: [{ type: String }],
  },
  { timestamps: true }
)

export default mongoose.model("Project", projectSchema)
