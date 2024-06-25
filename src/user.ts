import { Appointment } from "../models/appointment";
import { User } from "../models/user";
import { CustomRequest } from "./user.authentication";
import { Response } from "express";

export const getUser = async (req: CustomRequest, res: Response) => {
  try {
    const user = await User.findById(req.user?._id);
    const appointmentList = await Appointment.find({
      userID: req.user?._id,
    });

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }

    return res.status(200).json({
      status: 200,
      user: {
        name: user?.name,
        appointmentCount: appointmentList.length,
        ageCount: new Date().getFullYear() - user.createdAt.getFullYear(),
        documentCount: 0,
        appointments: appointmentList,
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
