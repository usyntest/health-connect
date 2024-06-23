import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({path: __dirname + '/../.env'})

// ROUTE FUNCTIONS
import register from "./register";
import login from './login';
import { changeAppointmentStatus, createAppointment, getAllAppointment,  } from "./appointment";

// AUTHENTICATION MIDDLEWARE
import authentication from "./user.authentication"

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('', authentication, (req: Request, res: Response) => {
    res.status(200).json({
        status: 200,
        success: true,
        message: "Welcome to Health Connect API"
    })
})

// ROUTES

// APPOINTMENT
app.get('/appointment/all', authentication, getAllAppointment)
app.post('/appointment/create', authentication, createAppointment)
app.post('/appointment/status', authentication, changeAppointmentStatus)

// AUTHENTICATION
app.post('/auth/register', register)
app.post('/auth/login', login)


app.listen(port, async () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);

    try {
        await mongoose.connect(`mongodb+srv://${process.env.DATABASE_USERNAME as string}:${process.env.DATABASE_PASSWORD as string}@cluster0.1mvxsyf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)

        console.log("[server]: Connected to Database")

    } catch(error) {
        console.log("[server]: Error connecting to database")
    }
})