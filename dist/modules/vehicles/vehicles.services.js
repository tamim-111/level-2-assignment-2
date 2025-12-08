import { pool } from "../../config/db.js";
const sendVehicleIntoDB = async (Payload) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = Payload;
    const result = await pool.query("INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES($1, $2, $3, $4, $5) RETURNING *", [vehicle_name, type, registration_number, daily_rent_price, availability_status]);
    return result;
};
const getAllVehiclesFromDB = async () => {
    const result = await pool.query("SELECT * FROM vehicles");
    return result;
};
const getSingleVehiclesFromDB = async (vehicleId) => {
    const result = await pool.query("SELECT * FROM vehicles WHERE id=$1", [vehicleId]);
    return result;
};
const updateSingleVehiclesFromDB = async (Payload, vehicleId) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = Payload;
    const result = await pool.query("UPDATE vehicles SET vehicle_name=$1, type=$2, registration_number=$3, daily_rent_price=$4, availability_status=$5 WHERE id=$6 RETURNING *", [vehicle_name, type, registration_number, daily_rent_price, availability_status, vehicleId]);
    return result;
};
const updateSingleVehiclesStatusFromDB = async (availability_status, vehicleId) => {
    const result = await pool.query("UPDATE vehicles SET availability_status=$1 WHERE id=$2 RETURNING *", [availability_status, vehicleId]);
    return result;
};
const deleteSingleVehiclesFromDB = async (vehicleId) => {
    const activeBookings = await pool.query("SELECT id FROM bookings WHERE vehicle_id = $1 AND status = 'active'", [vehicleId]);
    if (activeBookings.rowCount > 0) {
        throw new Error("Cannot delete vehicle with active bookings");
    }
    const result = await pool.query("DELETE FROM vehicles WHERE id=$1", [vehicleId]);
    return result;
};
export const vehiclesServices = {
    sendVehicleIntoDB,
    getAllVehiclesFromDB,
    getSingleVehiclesFromDB,
    updateSingleVehiclesFromDB,
    updateSingleVehiclesStatusFromDB,
    deleteSingleVehiclesFromDB
};
//# sourceMappingURL=vehicles.services.js.map