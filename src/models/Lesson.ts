import { ILesson } from "../interfaces/ILesson.js";
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const lessonSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  language: {
    type: String,
    required: true,
    trim: true,
  },
  courseId: { type: Schema.Types.ObjectId, required: true, ref: "courses" },
});
export default mongoose.model<ILesson & mongoose.Document>("lessons", lessonSchema);
