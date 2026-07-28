import { Router } from "express"
import * as controller from "../controllers/projectController.js"
import { validate, projectSchema } from "../middleware/validate.js"

const router = Router()

router.get("/", controller.list)
router.get("/:id", controller.getById)
router.post("/", validate(projectSchema), controller.create)

export default router
