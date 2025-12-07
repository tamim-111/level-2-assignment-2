import { Router } from "express";
import { vehiclesControllers } from "./vehicles.controllers.js";

const router = Router()

router.post("/", vehiclesControllers.createVehicle)
router.get("/", vehiclesControllers.getAllVehicle)
router.get("/:vehicleId", vehiclesControllers.getSingleVehicle)
router.put("/:vehicleId", vehiclesControllers.updateSingleVehicle)
router.delete("/:vehicleId", vehiclesControllers.deleteSingleVehicle)

export const vehiclesRoutes = router