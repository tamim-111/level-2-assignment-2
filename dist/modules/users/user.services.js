import { pool } from "../../config/db.js";
const getAllUserFromDB = async () => {
    const result = await pool.query("SELECT * FROM users");
    return result;
};
const updateSingleUserFromDB = async (Payload, id) => {
    const { name, email, phone, role } = Payload;
    const result = await pool.query("UPDATE users SET name=$1, email=$2, phone=$3, role=$4 WHERE id=$5 RETURNING *", [name, email, phone, role, id]);
    return result;
};
const deleteSingleUserFromDB = async (id) => {
    const activeBookings = await pool.query("SELECT id FROM bookings WHERE customer_id = $1 AND status = 'active'", [id]);
    if (activeBookings.rowCount > 0) {
        throw new Error("Cannot delete user with active bookings");
    }
    const result = await pool.query("DELETE FROM users WHERE id=$1", [id]);
    return result;
};
export const userServices = {
    getAllUserFromDB,
    updateSingleUserFromDB,
    deleteSingleUserFromDB
};
//# sourceMappingURL=user.services.js.map