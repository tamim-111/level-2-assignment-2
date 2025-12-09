import { Request, Response } from "express";
import { bookingsServices } from "./bookings.services.js";
import { pool } from "../../config/db.js";

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
            "detail": err.detail
        })
    }
}

const getAllBookings = async (req: Request, res: Response) => {
    try {
        const user = req.user;

        if (!user) throw new Error("User not found");


        const autoReturnBookings = await pool.query(
            "SELECT id, vehicle_id FROM bookings WHERE status='active' AND rent_end_date < NOW()"
        );

        for (const booking of autoReturnBookings.rows) {
            await pool.query(
                "UPDATE bookings SET status='returned' WHERE id=$1",
                [booking.id]
            );
            await pool.query(
                "UPDATE vehicles SET availability_status='available' WHERE id=$1",
                [booking.vehicle_id]
            );
        }


        if (user.role === "admin") {
            const result = await bookingsServices.getAllBookingsFromDB();

            const enhanced = await Promise.all(
                result.rows.map(async (booking: any) => {
                    const [vehicleRes, customerRes] = await Promise.all([
                        pool.query("SELECT vehicle_name, registration_number FROM vehicles WHERE id=$1", [booking.vehicle_id]),
                        pool.query("SELECT name, email FROM users WHERE id=$1", [booking.customer_id])
                    ]);

                    return {
                        ...booking,
                        vehicle: vehicleRes.rows[0],
                        customer: customerRes.rows[0]
                    };
                })
            );

            return res.status(200).json({
                success: true,
                message: "Bookings retrieved successfully",
                data: enhanced
            });
        }

        if (user.role === "customer") {
            const result = await bookingsServices.getSingleBookingsFromDB(user.id);

            const enhanced = await Promise.all(
                result.rows.map(async (booking: any) => {
                    const vehicleRes = await pool.query(
                        "SELECT vehicle_name, registration_number, type FROM vehicles WHERE id=$1",
                        [booking.vehicle_id]
                    );

                    return {
                        ...booking,
                        vehicle: vehicleRes.rows[0]
                    };
                })
            );

            return res.status(200).json({
                success: true,
                message: "Your bookings retrieved successfully",
                data: enhanced
            });
        }

        res.status(403).json({ success: false, message: "Access denied" });
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const updateSingleBooking = async (req: Request, res: Response) => {
    try {
        const bookingId = req.params.bookingId;
        const status = req.body.status;
        const user = req.user;

        if (!status || !["cancelled", "returned"].includes(status)) {
            throw new Error("Invalid status");
        }

        const updatedBooking = await bookingsServices.updateSingleBookingFromDB(bookingId as string, status, user);

        const message =
            status === "cancelled"
                ? "Booking cancelled successfully"
                : "Booking marked as returned. Vehicle is now available";

        res.status(200).json({
            success: true,
            message,
            data: updatedBooking.rows ? updatedBooking.rows[0] : updatedBooking
        });
    } catch (err: any) {
        res.status(400).json({ success: false, message: err.message });
    }
};

export const bookingsControllers = {
    createBooking,
    getAllBookings,
    updateSingleBooking
}