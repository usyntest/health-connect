import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface User {
    _id: number,
    email: string
}

export interface CustomRequest extends Request {
    user?: User,
}

const authentication = (req: CustomRequest, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization;

    // Check if authorization header is present
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ status: 401, message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1]; // Extract token from 'Bearer '

    const secret: string | undefined = process.env.JWT_SECRET

    if (!secret) {
        return res.send(500).json({
            status: 500,
            message: "Internal server error"
        })
    }

    // Verify the token
    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded as User;
        next();
    } catch (error) {
        console.error('Error verifying JWT:', error);
        return res.status(403).json({ status: 403, message: 'Invalid JWT' });
    }

}

export default authentication;