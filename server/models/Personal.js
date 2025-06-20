import mongoose from "mongoose";

const personalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    occupancy: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export const Personal = mongoose.model("Personal", personalSchema);
