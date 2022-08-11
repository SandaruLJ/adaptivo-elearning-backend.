import { ILearningStyle } from "../interfaces/ILearningStyle.js";
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const LearningStyleSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
      trim: true,
    },
    input: {
      sensing: {
        type: Number,
      },
      intuitive: {
        type: Number,
      },
      sensingStrength: {
        type: String,
      },
      intuitiveStrength: {
        type: String,
      },
    },
    processing: {
      active: {
        type: Number,
      },
      reflective: {
        type: Number,
      },
      processingStrength: {
        type: String,
      },
      reflectiveStrength: {
        type: String,
      },
    },
    understanding: {
      sequential: {
        type: Number,
      },
      global: {
        type: Number,
      },
      sequentialStrength: {
        type: String,
      },
      globalStrength: {
        type: String,
      },
    },
    perception: {
      visual: {
        type: Number,
      },
      verbal: {
        type: Number,
      },
      visualStrength: {
        type: String,
      },
      verbalStrength: {
        type: String,
      },
    },
    isOnboardingTourCompleted: {
      type: Boolean,
      required: true,
      trim: true,
    },
    isDetectedByAlgorithm: {
      type: Boolean,
      required: true,
      trim: true,
    },
    detectedLearningStyle: {
      input: {
        type: String,
      },
      processing: {
        type: String,
      },
      understanding: {
        type: String,
      },
      perception: {
        type: String,
      },
    },
  },
  { timestamps: true }
);
export default mongoose.model<ILearningStyle & mongoose.Document>("learningStyle", LearningStyleSchema);
