import { IQuiz } from "../interfaces/IQuiz.js";
import mongoose from "mongoose";

const Schema = mongoose.Schema;
const QuizSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    explanation: {
      type: String,
      required: true,
      trim: true,
    },
    answers: [],
    correctAnswer: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IQuiz & mongoose.Document>("quiz", QuizSchema);
