import { ILearningObject } from "../interfaces/ILearningObject.js";
import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
const Schema = mongoose.Schema;
const LearningObjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    video: { type: Schema.Types.ObjectId, required: true, ref: "LearningResources", autopopulate: true },
    audio: { type: Schema.Types.ObjectId, required: true, ref: "LearningResources", autopopulate: true },
    resources: [{ type: Schema.Types.ObjectId, required: true, ref: "LearningResources", autopopulate: true }],
    quiz: [{ type: Schema.Types.ObjectId, required: true, ref: "quiz", autopopulate: true }],
  },
  { timestamps: true }
);
LearningObjectSchema.plugin(mongooseAutoPopulate);

export default mongoose.model<ILearningObject & mongoose.Document>("LearningObjects", LearningObjectSchema);
