import { NextFunction, Request, Response } from "express"
import config from "../index.js";
import jwt, { JwtPayload } from "jsonwebtoken";

const authMiddleware = (...allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const authHeader = req.headers.authorization

            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return res.status(401).json({ message: "Unauthorized: Token missing" });
            }

            const token = authHeader.split(" ")[1]

            const secret = config.jwtSecret as string

            const payload = jwt.verify(token as string, secret) as JwtPayload

            req.user = payload

            if (allowedRoles.length > 0) {
                const userRole = payload.role as string;

                if (!allowedRoles.includes(userRole)) {
                    return res.status(403).json({ message: "Forbidden: Access denied" });
                }
            }

            next()
        }
        catch (err) {
            return res.status(401).send({ message: "Invalid or expired token" });
        }
    }
}

export default authMiddleware