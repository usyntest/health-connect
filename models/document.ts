import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    key: {
      type: String,
      required: true,
    },
    isPrivate: {
      type: Boolean,
      required: false,
      default: true,
    },
    type: {
      type: String,
      required: true,
    },
    documentURL: {
      type: String,
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
