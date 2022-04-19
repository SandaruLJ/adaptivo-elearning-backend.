import { ILearningObject } from "../interfaces/ILearningObject.js";
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const LearningObjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    video: { type: Schema.Types.ObjectId, required: true, ref: "LearningResources" },
    audio: { type: Schema.Types.ObjectId, required: true, ref: "LearningResources" },
    resources: [{ type: Schema.Types.ObjectId, required: true, ref: "LearningResources" }],
    quiz: [{ type: Schema.Types.ObjectId, required: true, ref: "quiz" }],
  },
  { timestamps: true }
);
export default mongoose.model<ILearningObject & mongoose.Document>("LearningObjects", LearningObjectSchema);
