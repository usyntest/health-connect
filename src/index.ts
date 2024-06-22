import express, { Application, NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import dotenv from "dotenv";
import register from "./register";
import login from './login';

dotenv.config({path: __dirname + '/../.env'})

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

interface User {
    _id: number,
    email: string
}

interface CustomRequest extends Request {
    user?: User
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

app.get('', (req: Request, res: Response) => {
    res.status(200).json({
        status: 200,
        success: true,
        message: "Welcome to Health Connect API"
    })
})

app.get('/posts', authentication, (req: CustomRequest, res: Response) => {
    res.status(200).json({
        status: 200,
        success: true,
        posts: [
            { "content": "hello, world this is uday testing his application" },
            { "content": "hello, world this is uday testing his application" },
            { "content": "hello, world this is uday testing his application" },
            { "content": "hello, world this is uday testing his application" },
            { "content": "hello, world this is uday testing his application" },
            { "content": "hello, world this is uday testing his application" },
        ]
    })
})

app.post('/auth/register', register) 
app.post('/auth/login', login)


app.listen(port, async () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);

    try {

        await mongoose.connect(`mongodb+srv://usyntest:${process.env.DATABASE_PASSWORD as string}@cluster0.1mvxsyf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)

        console.log("[server]: Connected to Database")

    } catch(error) {
        console.log("[server]: Error connecting to database")
    }
})