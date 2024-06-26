import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    required: true,
    enum: ["Upcoming", "Cancelled", "Completed"],
  },
  appointmentTime: {
    type: Date,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  meetingLink: {
    type: String,
    required: true,
  },
  prescriptionID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Documents",
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  doctorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctors",
  },
});

export const Appointment = mongoose.model("Appointments", AppointmentSchema);
