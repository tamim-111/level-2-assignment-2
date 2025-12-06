import { Router } from "express";
import { vehiclesControllers } from "./vehicles.controllers.js";

const router = Router()

router.post("/", vehiclesControllers.createVehicle)
// router.get("/",)
// router.get("/:vehicleId",)
// router.put("/:vehicleId",)
// router.delete("/:vehicleId",)

export const vehiclesRoutes = router