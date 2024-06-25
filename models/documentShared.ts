import mongoose from "mongoose";

const documentSharedSchema = new mongoose.Schema({
  documentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Document",
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  doctorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  },
});

export const Appointment = mongoose.model(
  "DocumentShared",
  documentSharedSchema
);
