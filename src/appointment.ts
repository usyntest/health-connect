import { Request, Response } from "express";
import { CustomRequest } from "./user.authentication";
import { Appointment } from "../models/appointment";

// ENDPOINT TO GET ALL APPOINTMENTS OF AN USER
// REQUIREMENT - userID
export const getAllAppointment = async (req: CustomRequest, res: Response) => {
  const appointments = await Appointment.find({
    userID: req.user?._id,
  });

  return res.status(200).json({
    status: 200,
    success: true,
    appointments: appointments,
  });
};

// ENDPOINT TO CREATE AN APPOINTMENT
// REQUIREMENT - doctorID, userID, appointmentTime, message
export const createAppointment = async (req: Request, res: Response) => {
  const appointment = req.body;
  const { doctorID, userID, appointmentTime, message } = appointment;

  try {
    const now = new Date();
    const appointmentTimeNew = new Date(appointmentTime);

    if (appointmentTimeNew <= now) {
      return res.status(400).json({
        status: 400,
        message: "Appointment time must be in the future",
      });
    }

    const existingAppointment = await Appointment.findOne({
      doctorID: doctorID,
      appointmentTime: appointmentTimeNew,
      status: "Upcoming",
    });

    if (existingAppointment) {
      return res.status(400).json({
        status: 400,
        message: "Doctor already has an appointment at the time",
      });
    }

    const newAppointment = await Appointment.create({
      doctorID,
      userID,
      appointmentTimeNew,
      meetingLink: "https://meet.google.com/xxa-pcvz-jtd",
      status: "Upcoming",
      message,
    });

    res.status(201).json(newAppointment);
  } catch (error) {
    console.log(`[server]: ${error}`);
    res.status(500).json({ message: "Error creating appointment" });
  }
};

// ENDPOINT TO CHANGE STATUS OF AN APPOINTMENT
// REQUIREMENT - appointmentID, statuse
export const changeAppointmentStatus = async (req: Request, res: Response) => {
  const { appointmentID, status } = req.body;

  if (!appointmentID) {
    return res.status(400).json({
      status: 400,
      message: "AppointmentID not given",
    });
  }

  if (!(status in ["Upcoming", "Cancelled", "Completed"])) {
    return res.status(400).json({
      status: 400,
      message: 'Status can be "Upcoming", "Cancelled", "Completed"',
    });
  }

  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentID,
      { $set: { status: status } },
      { new: true }
    );

    if (updatedAppointment) {
      return res.status(200).json({
        status: 200,
        sucess: true,
        message: `Status changed to ${status}`,
      });
    }

    res.status(404).json({
      status: 404,
      message: `Appointment not found`,
    });
  } catch (error) {
    console.log(`[server]: ${error}`);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};
