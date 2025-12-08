import { Router } from "express";
import { bookingsControllers } from "./bookings.controllers.js";
import authMiddleware from "../../config/middleware/auth.js";

const router = Router()

router.post("/", authMiddleware("admin", "customer"), bookingsControllers.createBooking)
router.get("/", authMiddleware("admin", "customer"), bookingsControllers.getAllBookings)
router.put("/:bookingId", authMiddleware("admin", "customer"), bookingsControllers.updateSingleBooking)

export const bookingsRoutes = router