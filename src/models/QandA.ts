
import mongoose from "mongoose";
import { IQandA } from "../interfaces/IQandA.js";

const Schema = mongoose.Schema;
const QandASchema = new Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: String,
      required: true,
      trim: true,
    },
    answers: [],
   
  },
  { timestamps: true }
);

export default mongoose.model<IQandA & mongoose.Document>("QandA", QandASchema);
