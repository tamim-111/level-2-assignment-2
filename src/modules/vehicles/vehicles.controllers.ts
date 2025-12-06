import { Request, Response } from "express"
import { vehiclesServices } from "./vehicles.services.js"

const createVehicle = async (req: Request, res: Response) => {
    try {
        const result = await vehiclesServices.sendVehicleIntoDB(req.body)
        res.send({
            "success": true,
            "message": "Vehicle created successfully",
            "data": result.rows[0]
        })
    }
    catch (err: any) {
        res.status(500).send({ message: err.message })
    }
}

export const vehiclesControllers = {
    createVehicle
}