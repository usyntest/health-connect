import mongoose from "mongoose";

const sharedDocumentSchema = new mongoose.Schema({
  documentID: {
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

export const SharedDocument = mongoose.model(
  "SharedDocument",
  sharedDocumentSchema
);
