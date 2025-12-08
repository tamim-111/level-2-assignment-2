import { Router } from "express";
import { userControllers } from "./user.controllers.js";
import authMiddleware from "../../config/middleware/auth.js";
const router = Router();
router.get("/", authMiddleware("admin"), userControllers.getAllUser);
router.put("/:userId", authMiddleware("admin", "customer"), userControllers.updateSingleUser);
router.delete("/:userId", authMiddleware("admin"), userControllers.deleteSingleUser);
export const userRoutes = router;
//# sourceMappingURL=user.routes.js.map