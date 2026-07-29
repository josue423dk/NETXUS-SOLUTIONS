import * as contactService from "../services/contactService.js"

export async function list(_req, res, next) {
  try {
    const messages = await contactService.list()
    res.json(messages)
  } catch (err) {
    next(err)
  }
}

export async function create(req, res, next) {
  try {
    const contact = await contactService.create(req.body)
    res.status(201).json(contact)
  } catch (err) {
    next(err)
  }
}
