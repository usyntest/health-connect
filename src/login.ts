import jwt from "jsonwebtoken";
import express, { Request, Response } from "express"
import { User } from "../models/User";

const login = async (req: Request, res: Response) => {
    const user = req.body;
    const { email, password } = user;

    const userExists = await User.findOne({
        email: email
    })

    if (!userExists) {
        return res.status(404).json({
            status: 404,
            message: "User not found"
        })
    }

    if (password != userExists.password) {
        return res.status(401).json({
            status: 401,
            message: "Invalid login credentials"
        })
    }

    const secret: string | undefined = process.env.JWT_SECRET;

    if (!secret) {
        return res.send(500).json({
            status: 500,
            message: "Internal server error"
        })
    }

    const token = jwt.sign(
        {_id: userExists._id, email: userExists.email},
        secret,
        {expiresIn: "1d"}
    )

    return res.status(200).json({
        status: 200,
        success: true,
        message: "login success",
        token: token,
    });
}

export default login;