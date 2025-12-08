import { Request, Response } from "express";
import { userServices } from "./user.services.js";

const getAllUser = async (req: Request, res: Response) => {
    try {
        const result = await userServices.getAllUserFromDB()

        res.send({
            "success": true,
            "message": "Users retrieved successfully",
            "data": result.rows
        })
    }
    catch (err: any) {
        res.status(500).send({
            "success": true,
            "message": err.message,
            "detail": err.detail
        })
    }
}

const updateSingleUser = async (req: Request, res: Response) => {
    try {
        const loggedInUser = req.user!
        const userId = req.params.userId

        if (loggedInUser.role !== "admin" && loggedInUser.id !== userId) {
            return res.status(403).json({ message: "Forbidden: You can update only your own profile" });
        }

        const result = await userServices.updateSingleUserFromDB(req.body, userId as string)

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
        })
    }
    catch (err: any) {
        res.status(500).send({
            "success": true,
            "message": err.message,
            "detail": err.detail
        })
    }
}

const deleteSingleUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId

        const result = await userServices.deleteSingleUserFromDB(userId as string)

        res.send({
            "success": true,
            "message": "User deleted successfully"
        })
    }
    catch (err: any) {
        res.status(500).send({
            "success": true,
            "message": err.message,
            "detail": err.detail
        })
    }
}

export const userControllers = {
    getAllUser,
    updateSingleUser,
    deleteSingleUser
}