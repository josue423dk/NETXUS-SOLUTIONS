import Contact from "../models/Contact.js"

export async function list() {
  return Contact.find({}).sort({ createdAt: -1 })
}

export async function create(data) {
  const contact = new Contact(data)
  return contact.save()
}
