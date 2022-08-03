import { IConcept } from "../interfaces/IConcept.js";
import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const Schema = mongoose.Schema;
const conceptSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    preRequisites: [{ type: Schema.Types.ObjectId, required: true, ref: "concepts", autopopulate: true }],
    learningObjects: [{ type: Schema.Types.ObjectId, required: true, ref: "LearningObjects", autopopulate: true }],
  },
  { timestamps: true }
);
conceptSchema.plugin(mongooseAutoPopulate);
export default mongoose.model<IConcept & mongoose.Document>("concepts", conceptSchema);
