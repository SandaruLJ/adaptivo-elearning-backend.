import { IConcept } from "../interfaces/IConcept.js";
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const conceptSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    preRequisites: [{ type: Schema.Types.ObjectId, required: true, ref: "concepts" }],
    learningObjects: [{ type: Schema.Types.ObjectId, required: true, ref: "LearningObjects" }],
  },
  { timestamps: true }
);
export default mongoose.model<IConcept & mongoose.Document>("concepts", conceptSchema);
