import { IPreference } from "../interfaces/IPreference.js";
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const PreferenceSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    learningDimension: {
      type: String,
      required: true,
      trim: true,
    },

    answers: [
      {
        answer: {
          type: String,
          required: true,
          trim: true,
        },
        learningStyle: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
  },
  { timestamps: true }
);
export default mongoose.model<IPreference & mongoose.Document>("preferences", PreferenceSchema);
