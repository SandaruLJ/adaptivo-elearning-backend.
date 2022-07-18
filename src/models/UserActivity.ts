import { IUserActivity } from "../interfaces/IUserActivity.js";
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const userActivitySchema = new Schema(
  {
    app: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: String,
      required: true,
      trim: true,
    },
    page: {
      type: String,
      required: true,
      trim: true,
    },
    action: {
      type: String,
      required: true,
      trim: true,
    },
    time: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model<IUserActivity & mongoose.Document>("userActivity", userActivitySchema);
