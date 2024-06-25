import mongoose from "mongoose";

const sharedDocumentSchema = new mongoose.Schema({
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

export const SharedDocument = mongoose.model(
  "SharedDocument",
  sharedDocumentSchema
);
