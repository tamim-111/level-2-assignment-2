import { pool } from "../../config/db.js"

const getAllUserFromDB = async () => {
    const result = await pool.query("SELECT * FROM users")

    return result
}

const updateSingleUserFromDB = async (Payload: Record<string, unknown>, id: string) => {
    const { name, email, phone, role } = Payload

    const result = await pool.query("UPDATE users SET name=$1, email=$2, phone=$3, role=$4 WhERe id=$5", [name, email, phone, role, id])

    return result
}

const deleteSingleUserFromDB = async (id: string) => {
    const result = await pool.query("DELETE FROM users WHERE id=$1", [id])

    return result
}

export const userServices = {
    getAllUserFromDB,
    updateSingleUserFromDB,
    deleteSingleUserFromDB
}