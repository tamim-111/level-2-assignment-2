import express, { Request, Response } from "express";
import { vehiclesRoutes } from "./modules/vehicles/vehicles.routes.js";
import initDB from "./config/db.js";

const app = express();
app.use(express.json());

initDB()

app.use("/api/v1/vehicles", vehiclesRoutes)

app.use((req: Request, res: Response) => {
    res.status(404).json({
        error: "Route Not Found",
        path: req.path
    })
})

export default app