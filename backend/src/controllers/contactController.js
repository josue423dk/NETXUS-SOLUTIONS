import * as contactService from "../services/contactService.js"

export async function create(req, res, next) {
  try {
    const result = await contactService.create(req.body)
    res.status(201).json({ message: "Mensaje recibido correctamente", data: result })
  } catch (err) {
    next(err)
  }
}
