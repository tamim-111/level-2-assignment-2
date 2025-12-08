import express, { Request, Response } from "express";
import { vehiclesRoutes } from "./modules/vehicles/vehicles.routes.js";
import initDB from "./config/db.js";
import { authRoutes } from "./modules/auth/auth.routes.js";
import { userRoutes } from "./modules/users/user.routes.js";
import { bookingsRoutes } from "./modules/bookings/bookings.routes.js";

const app = express();
app.use(express.json());

initDB()

app.use("/api/v1/auth", authRoutes)

app.use("/api/v1/vehicles", vehiclesRoutes)

app.use("/api/v1/users", userRoutes)

app.use("/api/v1/bookings", bookingsRoutes)

app.use((req: Request, res: Response) => {
    res.status(404).json({
        error: "Route Not Found",
        path: req.path
    })
})

export default app