import { Pool } from "pg";
import config from "./index.js";
export const pool = new Pool({ connectionString: `${config.connection_str}` });

const initDB = async () => {

    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL CHECK (email = LOWER(email)),
        password TEXT NOT NULL CHECK (char_length(password) >= 6),
        phone TEXT NOT NULL,
        role TEXT NOT NULL CHECK (role IN ('admin', 'customer'))
        )`)

    await pool.query(`
        CREATE TABLE IF NOT EXISTS vehicles(
        id SERIAL PRIMARY KEY,
        vehicle_name TEXT NOT NULL,
        type TEXT NOT NULL CHECK (type IN ('car', 'bike', 'van', 'SUV')),
        registration_number TEXT UNIQUE NOT NULL,
        daily_rent_price INT NOT NULL CHECK (daily_rent_price > 0),
        availability_status TEXT NOT NULL CHECK (availability_status IN ('available', 'booked'))
        )`)

    await pool.query(`
        CREATE TABLE IF NOT EXISTS bookings(
        id SERIAL PRIMARY KEY,
        customer_id INT REFERENCES users(id) ON DELETE CASCADE,
        vehicle_id INT REFERENCES vehicles(id) ON DELETE CASCADE,
        rent_start_date TIMESTAMP NOT NULL DEFAULT NOW(),
        rent_end_date TIMESTAMP NOT NULL,
        total_price INT NOT NULL CHECK (total_price > 0),
        status TEXT CHECK (status IN ('active', 'cancelled', 'returned'))
        )`)
}

export default initDB