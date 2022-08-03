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
    style: {
      type: String,
      required: true,
      trim: true,
      enum: ["visual", "verbal", "sensing", "intuitive", "active", "reflective", "sequential", "golbal"],
    },
    subStyle: {
      type: String,
      required: true,
      trim: true,
      enum: ["video", "visualNotes", "mindmap", "textRichFile", "realExampleVideo", "realExampleDoc", "additionalVideo", "additionalMaterials"],
    },
    type: {
      type: String,
      required: true,
      trim: true,
      enum: ["video", "audio", "image", "file"],
    },
    duration: {
      type: String,
      required: true,
      trim: true,
    },
    size: {
      type: String,
      required: true,
      trim: true,
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
