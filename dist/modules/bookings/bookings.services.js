import { pool } from "../../config/db.js";
import getNumberOfDays from "../../utils/getNumberOfDays.js";
import { vehiclesServices } from "../vehicles/vehicles.services.js";
const sendBookingIntoDB = async (Payload) => {
    const { customer_id, vehicle_id, rent_start_date, rent_end_date } = Payload;
    // Validate dates
    const days = getNumberOfDays(rent_start_date, rent_end_date);
    if (days <= 0) {
        throw new Error("End date must be after start date");
    }
    //  Vehicle exists check
    const vehicle = await vehiclesServices.getSingleVehiclesFromDB(vehicle_id);
    if (vehicle.rows.length === 0) {
        throw new Error("Vehicle not found");
    }
    const { vehicle_name, daily_rent_price, availability_status } = vehicle.rows[0];
    if (availability_status === 'booked') {
        throw new Error("Sorry this vehicle is already booked");
    }
    // 
    await vehiclesServices.updateSingleVehiclesStatusFromDB("booked", vehicle_id);
    const total_price = daily_rent_price * days;
    const status = "active";
    const result = await pool.query("INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) VALUES($1, $2, $3, $4, $5, $6) RETURNING *", [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status]);
    return result;
};
const getAllBookingsFromDB = async () => {
    const result = await pool.query("SELECT * FROM bookings");
    return result;
};
const getSingleBookingsFromDB = async (customer_id) => {
    const result = await pool.query("SELECT * FROM bookings WHERE customer_id=$1", [customer_id]);
    return result;
};
const getActiveBookingsByVehicleId = async (vehicleId) => {
    const result = await pool.query("SELECT * FROM bookings WHERE vehicle_id=$1 AND status='active'", [vehicleId]);
    return result;
};
const updateSingleBookingFromDB = async (bookingId, newStatus, user) => {
    const bookingRes = await pool.query("SELECT * FROM bookings WHERE id=$1", [bookingId]);
    if (bookingRes.rowCount === 0)
        throw new Error("Booking not found");
    const booking = bookingRes.rows[0];
    const now = new Date();
    const startDate = new Date(booking.rent_start_date);
    const endDate = new Date(booking.rent_end_date);
    if (now > endDate && booking.status === "active") {
        await pool.query("UPDATE vehicles SET availability_status='available' WHERE id=$1", [booking.vehicle_id]);
        const auto = await pool.query("UPDATE bookings SET status='returned' WHERE id=$1 RETURNING *", [bookingId]);
        return auto;
    }
    if (user.role === "customer") {
        if (booking.customer_id !== user.id)
            throw new Error("You are not allowed to cancel this booking");
        if (now >= startDate)
            throw new Error("You can only cancel before the start date");
        if (newStatus !== "cancelled")
            throw new Error("Customers can only cancel bookings");
    }
    if (user.role === "admin" && newStatus !== "returned") {
        throw new Error("Admins can only mark as returned");
    }
    const result = await pool.query("UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *", [newStatus, bookingId]);
    if (newStatus === "cancelled" || newStatus === "returned") {
        await pool.query("UPDATE vehicles SET availability_status='available' WHERE id=$1", [booking.vehicle_id]);
    }
    return result;
};
export const bookingsServices = {
    sendBookingIntoDB,
    getAllBookingsFromDB,
    getSingleBookingsFromDB,
    getActiveBookingsByVehicleId,
    updateSingleBookingFromDB
};
//# sourceMappingURL=bookings.services.js.map