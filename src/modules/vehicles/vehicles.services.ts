import { pool } from "../../config/db.js"

const sendVehicleIntoDB = async (Payload: Record<string, unknown>) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = Payload
    const result = await pool.query("INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES($1, $2, $3, $4, $5) RETURNING *",
        [vehicle_name, type, registration_number, daily_rent_price, availability_status])

    return result
}

export const vehiclesServices = {
    sendVehicleIntoDB
}