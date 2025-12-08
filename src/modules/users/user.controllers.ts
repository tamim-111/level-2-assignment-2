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
            message: err.message
        })
    }
}

const updateSingleUser = async (req: Request, res: Response) => {
    try {
        const loggedInUser = req.user!
        const id = req.params.id

        if (loggedInUser.role !== "admin" && loggedInUser.id !== id) {
            return res.status(403).json({ message: "Forbidden: You can update only your own profile" });
        }

        const result = await userServices.updateSingleUserFromDB(req.body, id as string)

        res.send({
            "success": true,
            "message": "User updated successfully",
            "data": result.rows[0]
        })
    }
    catch (err: any) {
        res.status(500).send({
            "success": true,
            message: err.message
        })
    }
}

const deleteSingleUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const result = await userServices.deleteSingleUserFromDB(id as string)

        res.send({
            "success": true,
            "message": "User deleted successfully"
        })
    }
    catch (err: any) {
        res.status(500).send({
            "success": true,
            message: err.message
        })
    }
}

export const userControllers = {
    getAllUser,
    updateSingleUser,
    deleteSingleUser
}