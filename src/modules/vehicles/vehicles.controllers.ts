import { Request, Response } from "express"
import { vehiclesServices } from "./vehicles.services.js"
import { bookingsServices } from "../bookings/bookings.services.js"

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
        res.status(500).send({
            "message": err.message,
            "detail": err.detail
        })
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
        res.status(500).send({
            "message": err.message,
            "detail": err.detail
        })
    }
}

const getSingleVehicle = async (req: Request, res: Response) => {
    try {
        const vehicleId = req.params.vehicleId
        const result = await vehiclesServices.getSingleVehiclesFromDB(vehicleId as string)
        res.send({
            "success": true,
            "message": "Vehicle retrieved successfully",
            "data": result.rows[0]
        })
    }
    catch (err: any) {
        res.status(500).send({
            "message": err.message,
            "detail": err.detail
        })
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
        res.status(500).send({
            "message": err.message,
            "detail": err.detail
        })
    }
}

const deleteSingleVehicle = async (req: Request, res: Response) => {
    try {
        const vehicleId = req.params.vehicleId;

        // check active bookings
        const activeBookings = await bookingsServices.getActiveBookingsByVehicleId(vehicleId as string);

        if (activeBookings.rows.length > 0) {
            return res.status(400).send({
                success: false,
                message: "Cannot delete vehicle because an active booking exists"
            });
        }

        // safe to delete
        await vehiclesServices.deleteSingleVehiclesFromDB(vehicleId as string);

        return res.send({
            success: true,
            message: "Vehicle deleted successfully"
        });
    }
    catch (err: any) {
        return res.status(500).send({
            message: err.message,
            detail: err.detail
        });
    }
};

export const vehiclesControllers = {
    createVehicle,
    getAllVehicle,
    getSingleVehicle,
    updateSingleVehicle,
    deleteSingleVehicle
}