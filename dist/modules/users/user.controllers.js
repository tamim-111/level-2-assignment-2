import { userServices } from "./user.services.js";
const getAllUser = async (req, res) => {
    try {
        const result = await userServices.getAllUserFromDB();
        res.send({
            "success": true,
            "message": "Users retrieved successfully",
            "data": result.rows
        });
    }
    catch (err) {
        res.status(500).send({
            "success": true,
            "message": err.message,
            "detail": err.detail
        });
    }
};
const updateSingleUser = async (req, res) => {
    try {
        const loggedInUser = req.user;
        const userId = req.params.userId;
        if (loggedInUser.role !== "admin" && loggedInUser.id !== userId) {
            return res.status(403).json({ message: "Forbidden: You can update only your own profile" });
        }
        const result = await userServices.updateSingleUserFromDB(req.body, userId);
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        res.send({
            "success": true,
            "message": "User updated successfully",
            "data": result.rows[0]
        });
    }
    catch (err) {
        res.status(500).send({
            "success": true,
            "message": err.message,
            "detail": err.detail
        });
    }
};
const deleteSingleUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const result = await userServices.deleteSingleUserFromDB(userId);
        res.send({
            "success": true,
            "message": "User deleted successfully"
        });
    }
    catch (err) {
        res.status(500).send({
            "success": true,
            "message": err.message,
            "detail": err.detail
        });
    }
};
export const userControllers = {
    getAllUser,
    updateSingleUser,
    deleteSingleUser
};
//# sourceMappingURL=user.controllers.js.map