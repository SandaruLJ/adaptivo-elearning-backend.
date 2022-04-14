import { ILearningResource } from "../interfaces/ILearningResource.js";
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const LearningResourceSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  lessonId: { type: Schema.Types.ObjectId, required: true, ref: "lessons" },
  courseId: { type: Schema.Types.ObjectId, required: true, ref: "courses" },
});
export default mongoose.model<ILearningResource & mongoose.Document>("LearningResources", LearningResourceSchema);
