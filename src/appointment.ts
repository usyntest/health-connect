import { Request, Response } from "express";
import { CustomRequest } from "./user.authentication";
import { Appointment } from "../models/appointment";
import { Doctor } from "../models/doctor";
import { User } from "../models/user";
import { Document } from "../models/document";
import { SharedDocument } from "../models/documentShared";

const checkAppointmentTime = async (
  appointmentTime: Date,
  appointmentID: String = "",
  doctorID: String = ""
) => {
  const appointmentTimeNew = new Date(appointmentTime);
  const now = new Date();

  if (appointmentTimeNew <= now) {
    return {
      error: true,
      message: "Appointment time must be in the future",
    };
  }

  if (appointmentID) {
    const doctor = await Appointment.findById(appointmentID);
    const appointment = await Appointment.findOne({
      doctorID: doctor?._id,
      appointmentTime: appointmentTimeNew,
    });

    if (appointment) {
      return {
        error: true,
        message: "Doctor already has an appointment at the time",
      };
    }
  } else {
    const appointment = await Appointment.findOne({
      doctorID: doctorID,
      appointmentTime: appointmentTimeNew,
    });

    if (appointment) {
      return {
        error: true,
        message: "Doctor already has an appointment at the time",
      };
    }
  }

  return {
    error: false,
    appointmentTime: appointmentTimeNew,
  };
};

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
    const existingAppointment = await checkAppointmentTime(
      appointmentTime,
      "",
      doctorID
    );

    if (existingAppointment.error) {
      return res.status(400).json({
        status: 400,
        message: existingAppointment.message,
      });
    }

    const newAppointment = await Appointment.create({
      doctorID,
      userID,
      appointmentTime: existingAppointment.appointmentTime,
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
export const changeAppointment = async (req: Request, res: Response) => {
  const { appointmentID, time, status } = req.body;

  if (!appointmentID) {
    return res.status(400).json({
      status: 400,
      message: "AppointmentID not given",
    });
  }

  if (status && !(["Upcoming", "Cancelled", "Completed"].includes(status))) {
    return res.status(400).json({
      status: 400,
      message: 'Status can be "Upcoming", "Cancelled", "Completed"',
    });
  }

  const existingAppointment = await checkAppointmentTime(time, appointmentID);

  if (time && existingAppointment.error) {
    return res.status(400).json({
      status: 400,
      messsage: existingAppointment.message,
    });
  }

  try {
    const changeContent: any = {};
    if (time) {
      changeContent.appointmentTime = existingAppointment.appointmentTime;
    }
    if (status) {
      changeContent.status = status;
    }
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      { _id: appointmentID },
      {
        $set: changeContent,
      },
      { new: true }
    );

    if (updatedAppointment) {
      return res.status(200).json({
        status: 200,
        sucess: true,
        message: `Changed Successfully`,
      });
    }

    return res.status(404).json({
      status: 404,
      message: `Appointment not found`,
    });
  } catch (error) {
    console.log(`[server]: ${error}`);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

// (GET) /appointment/:id
export const getAppointment = async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        status: 400,
        message: "Appointment ID is not given",
      });
    }
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      res.status(404).json({
        status: 404,
        message: "No appointment with this ID",
      });
    }

    const doctor = await Doctor.findById(appointment?.doctorID);
    const user = await User.findById(appointment?.userID);

    const documents = await Document.find({
      private: false,
      userID: user?._id,
    });

    const sharedList = await SharedDocument.find({
      userID: user?._id,
      doctorID: doctor?._id,
    });

    const documentList = documents.filter((document) =>
      sharedList.some(
        (sharedDocument) => sharedDocument.documentID === document._id
      )
    );

    return res.status(200).json({
      status: 200,
      appointmentDetails: {
        doctorDetails: {
          doctorName: doctor?.name,
          doctorImage: doctor?.imageURL,
          doctorID: doctor?._id,
        },
        userDetails: {
          userName: user?.name,
          userImage: user?.imageURL,
        },
        documentsShared: documentList.map((document) => {
          return {
            documentName: document.name,
            documentURL: document.documentURL,
            type: document.type,
          };
        }),
        status: appointment?.status,
        meetingLink: appointment?.meetingLink,
        appointmentTime: appointment?.appointmentTime,
        message: appointment?.message,
      },
    });
  } catch (error) {
    console.log(`[server]: ${error}`);
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};
