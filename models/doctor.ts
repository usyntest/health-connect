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
    photograph: {
      type: Image,
      required: true,
      default: "",
    },
    specialisation: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Doctor = mongoose.model("Doctors", DoctorSchema);
