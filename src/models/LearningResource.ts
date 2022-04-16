import { ILearningResource } from "../interfaces/ILearningResource.js";
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const LearningResourceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
      enum: ["video", "audio", "file"],
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model<ILearningResource & mongoose.Document>("LearningResources", LearningResourceSchema);
