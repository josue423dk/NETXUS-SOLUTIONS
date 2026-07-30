import { Router } from "express"
import * as controller from "../controllers/contactController.js"
import { validate, contactSchema } from "../middleware/validate.js"

const router = Router()

router.post("/", validate(contactSchema), controller.create)

export default router
