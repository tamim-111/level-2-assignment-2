import { Request, Response } from "express"
import { vehiclesServices } from "./vehicles.services.js"

const createVehicle = async (req: Request, res: Response) => {
    try {
        const result = await vehiclesServices.sendVehicleIntoDB(req.body)
        res.status(201).send({
            "success": true,
            "message": "Vehicle created successfully",
            "data": result.rows
        })
    }
    catch (err: any) {
        res.status(500).send({ message: err.message })
    }
}

const getAllVehicle = async (req: Request, res: Response) => {
    try {
        const result = await vehiclesServices.getAllVehiclesFromDB()
        if (result.rows.length > 0) {
            res.send({
                "success": true,
                "message": "Vehicles retrieved successfully",
                "data": result.rows
            })
        } else {
            res.send({
                "success": true,
                "message": "No vehicles found",
                "data": result.rows
            })
        }
    }
    catch (err: any) {
        res.status(500).send({ message: err.message })
    }
}

const getSingleVehicle = async (req: Request, res: Response) => {
    try {
        const vehicleId = req.params.vehicleId
        const result = await vehiclesServices.getSingleVehiclesFromDB(vehicleId as string)
        res.send({
            "success": true,
            "message": "Vehicles retrieved successfully",
            "data": result.rows[0]
        })
    }
    catch (err: any) {
        res.status(500).send({ message: err.message })
    }
}

const updateSingleVehicle = async (req: Request, res: Response) => {
    try {
        const vehicleId = req.params.vehicleId
        const result = await vehiclesServices.updateSingleVehiclesFromDB(req.body, vehicleId as string)
        res.send({
            "success": true,
            "message": "Vehicle updated successfully",
            "data": result.rows[0]
        })
    }
    catch (err: any) {
        res.status(500).send({ message: err.message })
    }
}

const deleteSingleVehicle = async (req: Request, res: Response) => {
    try {
        const vehicleId = req.params.vehicleId
        const result = await vehiclesServices.deleteSingleVehiclesFromDB(vehicleId as string)
        res.send({
            "success": true,
            "message": "Vehicle deleted successfully",
            "data": result.rows[0]
        })
    }
    catch (err: any) {
        res.status(500).send({ message: err.message })
    }
}

export const vehiclesControllers = {
    createVehicle,
    getAllVehicle,
    getSingleVehicle,
    updateSingleVehicle,
    deleteSingleVehicle
}