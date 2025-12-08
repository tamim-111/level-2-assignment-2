import { Request, Response } from "express";
import { bookingsServices } from "./bookings.services.js";

const createBooking = async (req: Request, res: Response) => {
    try {
        const result = await bookingsServices.sendBookingIntoDB(req.body)

        res.status(201).send({
            "success": true,
            "message": "Booking created successfully",
            "data": result.rows[0]
        })
    }
    catch (err: any) {
        res.status(500).send({
            "success": false,
            "message": err.message,
        })
    }
}

const getAllBookings = async (req: Request, res: Response) => {

    try {
        const user = req.user;

        let result;

        if (user?.role === "admin") {

            result = await bookingsServices.getAllBookingsFromDB()

            res.status(200).send({
                "success": true,
                "message": "Bookings retrieved successfully",
                "data": result.rows
            })
        }
        if (user?.role === "customer") {
            const id = user?.id
            result = await bookingsServices.getSingleBookingsFromDB(id)

            return res.status(200).send({
                success: true,
                message: "Your bookings retrieved successfully",
                data: result.rows
            });
        }
    }
    catch (err: any) {
        res.status(500).send({
            "success": false,
            "message": err.message,
        })
    }
}

const updateSingleBooking = async (req: Request, res: Response) => {
    try {
        const status = req.body.status
        const bookingId = req.params.bookingId
        const user = req.user;

        const result = await bookingsServices.updateSingleBookingFromDB(bookingId as string, status, user)

        let message = ""

        if (status === "cancelled") {
            message = "Booking cancelled successfully";
        } else if (status === "returned") {
            message = "Booking marked as returned. Vehicle is now available";
        }

        res.status(200).send({
            "success": true,
            "message": "Booking cancelled successfully",
            "data": result.rows[0]
        })
    }
    catch (err: any) {
        res.status(500).send({
            "success": false,
            "message": err.message,
        })
    }
}

export const bookingsControllers = {
    createBooking,
    getAllBookings,
    updateSingleBooking
}