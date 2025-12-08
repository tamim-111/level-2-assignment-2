import { Request, Response } from "express"
import { authServices } from "./auth.services.js"

const signupUser = async (req: Request, res: Response) => {
    try {
        const user = await authServices.sendSignupUserIntoDB(req.body)
        res.status(201).send({
            "success": true,
            "message": "User registered successfully",
            "data": user
        })
    }
    catch (err: any) {
        res.status(500).send({
            "success": false,
            message: err.message
        })
    }
}
const signinUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const result = await authServices.sendSigninUserIntoDB(email, password)

        res.status(201).send({
            "success": true,
            "message": "Login successful",
            "data": result
        })
    }
    catch (err: any) {
        res.status(500).send({
            "success": false,
            message: err.message
        })
    }
}

export const authControllers = {
    signupUser,
    signinUser
}