import { Router } from "express";
import { authControllers } from "./auth.controllers.js";
const router = Router();
router.post("/signup", authControllers.signupUser);
router.post("/signin", authControllers.signinUser);
export const authRoutes = router;
//# sourceMappingURL=auth.routes.js.map