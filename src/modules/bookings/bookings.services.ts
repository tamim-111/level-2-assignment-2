import { pool } from "../../config/db.js"
import getNumberOfDays from "../../utils/getNumberOfDays.js"
import { vehiclesServices } from "../vehicles/vehicles.services.js"

const sendBookingIntoDB = async (Payload: Record<string, unknown>) => {
    const { customer_id, vehicle_id, rent_start_date, rent_end_date } = Payload


    const vehicle = await vehiclesServices.getSingleVehiclesFromDB(vehicle_id as string)
    const { vehicle_name, daily_rent_price, availability_status } = vehicle.rows[0]

    if (availability_status === 'booked') {
        throw new Error("Sorry this vehicle is already booked")
    } else {
        const result = await vehiclesServices.updateSingleVehiclesStatusFromDB("booked", vehicle_id as string)
    }


    const number_of_days = getNumberOfDays(rent_start_date as string, rent_end_date as string)
    const total_price = daily_rent_price * number_of_days


    const status = "active"
    const vehicleInfo = {
        "vehicle_name": vehicle_name,
        "daily_rent_price": daily_rent_price
    }


    const result = await pool.query("INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status, vehicle) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *", [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status, vehicleInfo])


    return result
}


const getAllBookingsFromDB = async () => {

    const result = await pool.query("SELECT * FROM bookings")

    return result
}

const getSingleBookingsFromDB = async (customer_id: string) => {
    const result = await pool.query("SELECT * FROM bookings WHERE customer_id=$1", [customer_id])

    return result
}
const updateSingleBookingFromDB = async (bookingId: string, newStatus: string, user: any) => {

    const bookingRes = await pool.query("SELECT * FROM bookings WHERE id=$1", [bookingId]);

    if (bookingRes.rowCount === 0) {
        throw new Error("Booking not found");
    }

    const booking = bookingRes.rows[0];

    if (user.role === "customer") {
        if (booking.customer_id !== user.id) {
            throw new Error("You are not allowed to cancel this booking");
        }

        const now = new Date();
        const startDate = new Date(booking.rent_start_date);

        if (now >= startDate) {
            throw new Error("You can only cancel before the start date");
        }

        if (newStatus !== "cancelled") {
            throw new Error("Customers can only cancel bookings");
        }
    }

    if (user.role === "admin") {
        if (newStatus !== "returned") {
            throw new Error("Admins can only mark as returned");
        }

        await pool.query("UPDATE vehicles SET availability_status='available' WHERE id=$1", [booking.vehicle_id]);
    }

    const result = await pool.query(
        "UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *",
        [newStatus, bookingId]
    );

    return result;
};


export const bookingsServices = {
    sendBookingIntoDB,
    getAllBookingsFromDB,
    getSingleBookingsFromDB,
    updateSingleBookingFromDB
}