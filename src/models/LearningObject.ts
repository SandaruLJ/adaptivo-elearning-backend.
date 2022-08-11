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
    visual: {
      video: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: "LearningResources",
        autopopulate: true,
      },
      visualNote: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: "LearningResources",
        autopopulate: true,
      },
      mindmap: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: "LearningResources",
        autopopulate: true,
      },
    },
    verbal: {
      textRichFile: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: "LearningResources",
        autopopulate: true,
      },
    },
    sensing: {
      realExampleVideo: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: "LearningResources",
        autopopulate: true,
      },
      realExampleDoc: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: "LearningResources",
        autopopulate: true,
      },
    },
    intuitive: {
      additionalVideo: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: "LearningResources",
        autopopulate: true,
      },
      additionalMaterials: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: "LearningResources",
        autopopulate: true,
      },
    },
    active: {
      quiz: [{ type: Schema.Types.ObjectId, required: false, ref: "quiz", autopopulate: true }],
    },

    quiz: [{ type: Schema.Types.ObjectId, required: true, ref: "quiz", autopopulate: true }],
  },
  { timestamps: true }
);
LearningObjectSchema.plugin(mongooseAutoPopulate);

export default mongoose.model<ILearningObject & mongoose.Document>("LearningObjects", LearningObjectSchema);
