import config from "../index.js";
import jwt from "jsonwebtoken";
const authMiddleware = (...allowedRoles) => {
    return (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return res.status(401).json({ message: "Unauthorized: Token missing" });
            }
            const token = authHeader.split(" ")[1];
            const secret = config.jwtSecret;
            const payload = jwt.verify(token, secret);
            req.user = payload;
            if (allowedRoles.length > 0) {
                const userRole = payload.role;
                if (!allowedRoles.includes(userRole)) {
                    return res.status(403).json({ message: "Forbidden: Access denied" });
                }
            }
            next();
        }
        catch (err) {
            return res.status(401).send({ message: "Invalid or expired token" });
        }
    };
};
export default authMiddleware;
//# sourceMappingURL=auth.js.map