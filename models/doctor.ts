import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    specialisation: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Doctor = mongoose.model("Doctors", DoctorSchema);
