import mongoose from "mongoose"

const contactSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    email: { type: String, required: true },
    mensaje: { type: String, required: true },
    leido: { type: Boolean, default: false },
  },
  { timestamps: true }
)

contactSchema.index({ createdAt: -1 })

export default mongoose.model("Contact", contactSchema)
