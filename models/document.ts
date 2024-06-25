import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    private: {
      type: Boolean,
      required: false,
      default: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["Prescription", "CT Scan", "Report"],
    },
    documentURL: {
      type: Image,
      required: false,
      default: "",
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Document = mongoose.model("Documents", DocumentSchema);
