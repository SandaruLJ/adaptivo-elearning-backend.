import { ICourse } from "../interfaces/ICourse.js";
import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
const Schema = mongoose.Schema;
const CourseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subtitle: {
      type: String,
      required: false,
      trim: true,
    },
    category: { type: Schema.Types.ObjectId, required: true, ref: "categories", autopopulate: true },
    subCategory: { type: Schema.Types.ObjectId, required: true, ref: "categories", autopopulate: true },
    language: {
      type: String,
      required: true,
      trim: true,
    },
    level: {
      type: String,
      required: true,
      trim: true,
    },
    thumbnail: {
      type: Object,
      required: true,
      trim: true,
    },
    trailer: {
      type: Object,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    tier: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    currency: {
      type: String,
      required: true,
      trim: true,
    },
    welcome: {
      type: String,
      required: true,
      trim: true,
    },
    congratulations: {
      type: String,
      required: true,
      trim: true,
    },
    // instructors: [{ type: Schema.Types.ObjectId, required: true, ref: "instructors" }],
    // curriculum: {
    //   type: [Object],
    //   required: true,
    //   trim: true,
    // },
    curriculum: [
      {
        name: {
          type: String,
          required: false,
          trim: true,
        },
        units: [
          {
            name: {
              type: String,
              required: false,
              trim: true,
            },
            isConceptLink: {
              type: Boolean,
              required: false,
              trim: true,
            },
            type: {
              type: String,
              required: false,
              trim: true,
            },
            preTest: {
              type: Schema.Types.ObjectId,
              required: false,
              trim: true,
              ref: "concepts",
              autopopulate: true,
            },
            note: {
              type: String,
              required: false,
              trim: true,
            },
            file: {
              type: String,
              required: false,
              trim: true,
            },
            video: {
              type: Schema.Types.ObjectId,
              required: false,
              ref: "LearningResources",
              autopopulate: true,
            },
            audio: {
              type: Schema.Types.ObjectId,
              required: false,
              ref: "LearningResources",
              autopopulate: true,
            },
            loId: {
              type: Schema.Types.ObjectId,
              required: false,
              ref: "LearningObjects",
              autopopulate: true,
            },
            conceptId: {
              type: Schema.Types.ObjectId,
              required: false,
              ref: "concepts",
              autopopulate: true,
            },
            quiz: [
              {
                type: Schema.Types.ObjectId,
                required: false,
                ref: "quiz",
                // autopopulate: true,
              },
            ],
          },
        ],
      },
    ],
    // curriculum:{type:Schema.Types.ObjectId,required:true,ref:'curriculum'},
    outcomes: [
      {
        type: String,
        required: false,
        trim: true,
      },
    ],
    requirements: [
      {
        type: String,
        required: false,
        trim: true,
      },
    ],
  },
  { timestamps: true }
);
CourseSchema.plugin(mongooseAutoPopulate);
export default mongoose.model<ICourse & mongoose.Document>("courses", CourseSchema);
