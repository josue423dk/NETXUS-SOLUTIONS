import { Router } from "express"
import * as controller from "../controllers/contactController.js"
import { validate, contactSchema } from "../middleware/validate.js"
import { requireAdmin } from "../middleware/auth.js"

const router = Router()

router.get("/", requireAdmin, controller.list)
router.post("/", validate(contactSchema), controller.create)

export default router
