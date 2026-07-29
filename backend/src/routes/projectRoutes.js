import { Router } from "express"
import * as controller from "../controllers/projectController.js"
import { validate, projectSchema } from "../middleware/validate.js"
import { requireAdmin } from "../middleware/auth.js"

const router = Router()

router.get("/", controller.list)
router.get("/:id", controller.getById)
router.post("/", requireAdmin, validate(projectSchema), controller.create)
router.put("/:id", requireAdmin, validate(projectSchema), controller.update)
router.delete("/:id", requireAdmin, controller.remove)

export default router
