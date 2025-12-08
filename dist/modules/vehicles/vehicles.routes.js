import { Router } from "express";
import { vehiclesControllers } from "./vehicles.controllers.js";
import authMiddleware from "../../config/middleware/auth.js";
const router = Router();
router.post("/", authMiddleware("admin"), vehiclesControllers.createVehicle);
router.get("/", vehiclesControllers.getAllVehicle);
router.get("/:vehicleId", vehiclesControllers.getSingleVehicle);
router.put("/:vehicleId", authMiddleware("admin"), vehiclesControllers.updateSingleVehicle);
router.delete("/:vehicleId", authMiddleware("admin"), vehiclesControllers.deleteSingleVehicle);
export const vehiclesRoutes = router;
//# sourceMappingURL=vehicles.routes.js.map