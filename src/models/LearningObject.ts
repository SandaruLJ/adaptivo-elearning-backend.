import { ILearningObject } from "../interfaces/ILearningObject.js";
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const LearningObjectSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  lessonId: { type: Schema.Types.ObjectId, required: true, ref: "lessons" },
  courseId: { type: Schema.Types.ObjectId, required: true, ref: "courses" },
});
export default mongoose.model<ILearningObject & mongoose.Document>("LearningObjects", LearningObjectSchema);
