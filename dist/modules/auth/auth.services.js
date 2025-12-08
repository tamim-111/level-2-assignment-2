import bcrypt from "bcryptjs";
import { pool } from "../../config/db.js";
import config from "../../config/index.js";
import jwt from "jsonwebtoken";
const sendSignupUserIntoDB = async (Payload) => {
    const { name, email, password, phone, role } = Payload;
    const hashedPass = await bcrypt.hash(password, 10);
    const result = await pool.query("INSERT INTO users (name, email, password, phone, role) VALUES ($1, $2, $3, $4, $5) RETURNING *", [name, email, hashedPass, phone, role]);
    const user = result.rows[0];
    delete user.password;
    return user;
};
const sendSigninUserIntoDB = async (email, password) => {
    const result = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    const user = result.rows[0];
    if (!user) {
        throw new Error("User not found");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw new Error("Invalid credentials");
    }
    const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
    };
    const secret = config.jwtSecret;
    const token = jwt.sign(payload, secret, { expiresIn: "7d" });
    delete user.password;
    return { token, user };
};
export const authServices = {
    sendSignupUserIntoDB,
    sendSigninUserIntoDB
};
//# sourceMappingURL=auth.services.js.map