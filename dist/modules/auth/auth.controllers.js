import { authServices } from "./auth.services.js";
const signupUser = async (req, res) => {
    try {
        const user = await authServices.sendSignupUserIntoDB(req.body);
        res.status(201).send({
            "success": true,
            "message": "User registered successfully",
            "data": user
        });
    }
    catch (err) {
        res.status(500).send({
            "success": false,
            "message": err.message,
            "detail": err.detail
        });
    }
};
const signinUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await authServices.sendSigninUserIntoDB(email, password);
        res.status(201).send({
            "success": true,
            "message": "Login successful",
            "data": result
        });
    }
    catch (err) {
        res.status(500).send({
            "success": false,
            "message": err.message,
            "detail": err.detail
        });
    }
};
export const authControllers = {
    signupUser,
    signinUser
};
//# sourceMappingURL=auth.controllers.js.map