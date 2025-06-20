import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
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
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    teamSize: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export const Company = mongoose.model("Company", companySchema);
